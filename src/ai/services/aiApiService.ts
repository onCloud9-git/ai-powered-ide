/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { loadApiConfig, validateApiConfig } from '../config/apiConfig';

/**
 * Service for interacting with external AI APIs
 */
export class AIApiService {
    private config = loadApiConfig();

    constructor() {
        this.validateConfiguration();
    }

    /**
     * Test connection to OpenAI API
     */
    async testOpenAIConnection(): Promise<{ success: boolean; error?: string }> {
        if (!this.config.openai.apiKey) {
            return { success: false, error: 'OpenAI API key not configured' };
        }

        try {
            // Simple test request to OpenAI
            const response = await fetch(`${this.config.openai.baseUrl}/models`, {
                headers: {
                    'Authorization': `Bearer ${this.config.openai.apiKey}`,
                    'Content-Type': 'application/json'
                },
                signal: AbortSignal.timeout(this.config.openai.timeout)
            });

            if (response.ok) {
                return { success: true };
            } else {
                return { success: false, error: `HTTP ${response.status}: ${response.statusText}` };
            }
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
        }
    }

    /**
     * Test connection to Anthropic API
     */
    async testAnthropicConnection(): Promise<{ success: boolean; error?: string }> {
        if (!this.config.anthropic.apiKey) {
            return { success: false, error: 'Anthropic API key not configured' };
        }

        try {
            // Simple test request to Anthropic
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'x-api-key': this.config.anthropic.apiKey,
                    'Content-Type': 'application/json',
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: this.config.anthropic.model,
                    max_tokens: 10,
                    messages: [{ role: 'user', content: 'test' }]
                }),
                signal: AbortSignal.timeout(this.config.anthropic.timeout)
            });

            if (response.ok) {
                return { success: true };
            } else {
                return { success: false, error: `HTTP ${response.status}: ${response.statusText}` };
            }
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
        }
    }

    /**
     * Get configuration status
     */
    getConfigurationStatus(): {
        openai: boolean;
        anthropic: boolean;
        google: boolean;
        cohere: boolean;
        warnings: string[];
    } {
        const validation = validateApiConfig(this.config);

        return {
            openai: !!this.config.openai.apiKey,
            anthropic: !!this.config.anthropic.apiKey,
            google: !!this.config.google.apiKey,
            cohere: !!this.config.cohere.apiKey,
            warnings: validation.missing.map(key => `Missing ${key}`)
        };
    }

    /**
     * Test all configured API connections
     */
    async testAllConnections(): Promise<{
        openai: { success: boolean; error?: string };
        anthropic?: { success: boolean; error?: string };
        overall: boolean;
    }> {
        // Primary: Test OpenAI (required)
        const openaiResult = await this.testOpenAIConnection();

        // Optional: Test Anthropic only if configured
        let anthropicResult;
        if (this.config.anthropic.apiKey) {
            anthropicResult = await this.testAnthropicConnection();
        }

        return {
            openai: openaiResult,
            ...(anthropicResult && { anthropic: anthropicResult }),
            overall: openaiResult.success
        };
    }

    private validateConfiguration(): void {
        const validation = validateApiConfig(this.config);

        if (!validation.valid) {
            console.warn('AI API Configuration Issues:');
            validation.missing.forEach(key => {
                console.warn(`- Missing: ${key}`);
            });
            console.warn('Please check your .env file configuration.');
        }
    }
}

// Export singleton instance
export const aiApiService = new AIApiService();