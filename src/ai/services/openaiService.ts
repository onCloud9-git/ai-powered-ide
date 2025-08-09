/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { loadApiConfig } from '../config/apiConfig';

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface ChatCompletionRequest {
    messages: ChatMessage[];
    model?: string;
    temperature?: number;
    max_tokens?: number;
    stream?: boolean;
}

export interface ChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
        index: number;
        message: ChatMessage;
        finish_reason: string;
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

/**
 * Service for OpenAI API communication
 */
export class OpenAIService {
    private config = loadApiConfig().openai;

    constructor() {
        if (!this.config.apiKey) {
            console.warn('OpenAI API key not configured. AI features will be limited.');
        }
    }

    /**
     * Send chat completion request to OpenAI
     */
    async chatCompletion(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
        if (!this.config.apiKey) {
            throw new Error('OpenAI API key not configured');
        }

        const requestBody = {
            model: request.model || this.config.model,
            messages: request.messages,
            temperature: request.temperature ?? this.config.temperature,
            max_tokens: request.max_tokens || this.config.maxTokens,
            stream: request.stream || false
        };

        try {
            const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
                signal: AbortSignal.timeout(this.config.timeout)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            return await response.json();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`OpenAI request failed: ${error.message}`);
            }
            throw new Error('OpenAI request failed with unknown error');
        }
    }

    /**
     * Simple text completion helper
     */
    async complete(prompt: string, systemMessage?: string): Promise<string> {
        const messages: ChatMessage[] = [];

        if (systemMessage) {
            messages.push({ role: 'system', content: systemMessage });
        }

        messages.push({ role: 'user', content: prompt });

        const response = await this.chatCompletion({ messages });

        return response.choices[0]?.message?.content || '';
    }

    /**
     * Code-specific completion with context
     */
    async completeCode(
        code: string,
        language: string,
        context?: string
    ): Promise<string> {
        const systemMessage = `You are an expert ${language} developer. ${context ? `Context: ${context}` : ''}
Provide clean, well-commented code completions that follow best practices.`;

        return this.complete(code, systemMessage);
    }

    /**
     * Explain code functionality
     */
    async explainCode(
        code: string,
        language: string
    ): Promise<string> {
        const systemMessage = `You are an expert ${language} developer. 
Explain the provided code clearly and concisely, focusing on what it does and how it works.`;

        const prompt = `Please explain this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``;

        return this.complete(prompt, systemMessage);
    }

    /**
     * Suggest code improvements
     */
    async suggestImprovements(
        code: string,
        language: string
    ): Promise<string> {
        const systemMessage = `You are an expert ${language} developer and code reviewer.
Suggest specific improvements for code quality, performance, readability, and best practices.`;

        const prompt = `Please review and suggest improvements for this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``;

        return this.complete(prompt, systemMessage);
    }

    /**
     * Debug code issues
     */
    async debugCode(
        code: string,
        error: string,
        language: string
    ): Promise<string> {
        const systemMessage = `You are an expert ${language} developer and debugger.
Help identify and fix the issue in the provided code.`;

        const prompt = `I'm getting this error in my ${language} code:
Error: ${error}

Code:
\`\`\`${language}
${code}
\`\`\`

Please help me understand and fix this issue.`;

        return this.complete(prompt, systemMessage);
    }

    /**
     * Check if service is configured and ready
     */
    isConfigured(): boolean {
        return !!this.config.apiKey;
    }

    /**
     * Get current configuration status
     */
    getStatus(): {
        configured: boolean;
        model: string;
        baseUrl: string;
    } {
        return {
            configured: this.isConfigured(),
            model: this.config.model,
            baseUrl: this.config.baseUrl
        };
    }
}

// Export singleton instance
export const openaiService = new OpenAIService();