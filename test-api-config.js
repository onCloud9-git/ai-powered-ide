#!/usr/bin/env node

/**
 * Simple test script to verify AI API configuration
 * Run with: node test-api-config.js
 */

import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '.env') });

console.log('🔍 Testing AI API Configuration...\n');

// Check environment variables
const requiredKeys = [
    'OPENAI_API_KEY'
];

const optionalKeys = [
    'OPENAI_MODEL',
    'ANTHROPIC_API_KEY',
    'GOOGLE_AI_API_KEY',
    'COHERE_API_KEY',
    'AI_ENGINE_TIMEOUT',
    'AI_ENGINE_MAX_TOKENS'
];

let hasErrors = false;

console.log('📋 Required API Keys:');
requiredKeys.forEach(key => {
    const value = process.env[key];
    if (value) {
        console.log(`✅ ${key}: configured (${value.substring(0, 8)}...)`);
    } else {
        console.log(`❌ ${key}: missing`);
        hasErrors = true;
    }
});

console.log('\n📋 Optional Configuration:');
optionalKeys.forEach(key => {
    const value = process.env[key];
    if (value) {
        console.log(`✅ ${key}: ${value}`);
    } else {
        console.log(`⚠️  ${key}: not set (using default)`);
    }
});

console.log('\n🔧 Configuration Status:');
if (hasErrors) {
    console.log('❌ Configuration incomplete');
    console.log('\n💡 To fix:');
    console.log('1. Copy: cp .env.example .env');
    console.log('2. Edit .env and add your API keys');
    console.log('3. Run this test again');
    process.exit(1);
} else {
    console.log('✅ Configuration looks good!');
    console.log('\n🚀 You can now run the AI-powered IDE:');
    console.log('   npx gulp compile && ./scripts/code.sh');
}

// Test basic API connectivity (if keys are present)
if (process.env.OPENAI_API_KEY) {
    console.log('\n🌐 Testing OpenAI API connection...');

    fetch('https://api.openai.com/v1/models', {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                console.log('✅ OpenAI API: Connection successful');
            } else {
                console.log(`❌ OpenAI API: HTTP ${response.status}`);
            }
        })
        .catch(error => {
            console.log(`❌ OpenAI API: ${error.message}`);
        });
}