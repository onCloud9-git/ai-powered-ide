/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Configuration for AI API services
 */

export interface AIApiConfig {
    openai: {
        apiKey: string;
        model: string;
        baseUrl: string;
        timeout: number;
        maxTokens: number;
        temperature: number;
    };
    anthropic: {
        apiKey: string;
        model: string;
        timeout: number;
        maxTokens: number;
        temperature: number;
    };
    google: {
        apiKey: string;
        timeout: number;
    };
    cohere: {
        apiKey: string;
        timeout: number;
    };
    general: {
        cacheEnabled: boolean;
        cacheTtl: number;
        maxConcurrentRequests: number;
        debugRequests: boolean;
    };
}

/**
 * Load configuration from environment variables
 */
export function loadApiConfig(): AIApiConfig {
    // Load environment variables
    const env = process.env;

    return {
        openai: {
            apiKey: env.OPENAI_API_KEY || '',
            model: env.OPENAI_MODEL || 'gpt-4o-mini',
            baseUrl: env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
            timeout: parseInt(env.AI_ENGINE_TIMEOUT || '30000'),
            maxTokens: parseInt(env.AI_ENGINE_MAX_TOKENS || '4000'),
            temperature: parseFloat(env.AI_ENGINE_TEMPERATURE || '0.7')
        },
        anthropic: {
            apiKey: env.ANTHROPIC_API_KEY || '',
            model: env.ANTHROPIC_MODEL || 'claude-3-sonnet-20240229',
            timeout: parseInt(env.AI_ENGINE_TIMEOUT || '30000'),
            maxTokens: parseInt(env.AI_ENGINE_MAX_TOKENS || '4000'),
            temperature: parseFloat(env.AI_ENGINE_TEMPERATURE || '0.7')
        },
        google: {
            apiKey: env.GOOGLE_AI_API_KEY || '',
            timeout: parseInt(env.AI_ENGINE_TIMEOUT || '30000')
        },
        cohere: {
            apiKey: env.COHERE_API_KEY || '',
            timeout: parseInt(env.AI_ENGINE_TIMEOUT || '30000')
        },
        general: {
            cacheEnabled: env.AI_CACHE_ENABLED === 'true',
            cacheTtl: parseInt(env.AI_CACHE_TTL || '3600'),
            maxConcurrentRequests: parseInt(env.MAX_CONCURRENT_AI_REQUESTS || '5'),
            debugRequests: env.DEBUG_AI_REQUESTS === 'true'
        }
    };
}

/**
 * Validate that required API keys are present
 */
export function validateApiConfig(config: AIApiConfig): { valid: boolean; missing: string[] } {
    const missing: string[] = [];

    // Only OpenAI is required for now
    if (!config.openai.apiKey) {
        missing.push('OPENAI_API_KEY');
    }

    // Other providers are optional
    // if (!config.anthropic.apiKey) {
    //     missing.push('ANTHROPIC_API_KEY');
    // }

    return {
        valid: missing.length === 0,
        missing
    };
}

/**
 * Get configuration with fallbacks for missing keys
 */
export function getApiConfigWithFallbacks(): AIApiConfig {
    const config = loadApiConfig();

    // Log warnings for missing keys
    const validation = validateApiConfig(config);
    if (!validation.valid) {
        console.warn('Missing API keys:', validation.missing.join(', '));
        console.warn('Some AI features may not work properly. Please check your .env file.');
    }

    return config;
}