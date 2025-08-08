# AI-Powered IDE

This is a fork of Microsoft VSCode OSS, designed to become an AI-powered IDE combining the best features of VSCode, Kiro, and Cursor.

## Fork Information

- **Original Repository**: [microsoft/vscode](https://github.com/microsoft/vscode)
- **Fork Repository**: [onCloud9-git/ai-powered-ide](https://github.com/onCloud9-git/ai-powered-ide)
- **Fork Date**: January 8, 2025
- **Base Commit**: `7ca850c73f7` - "Use one "New Chat" command for view and editor toolbars"

## Project Goals

Create a comprehensive AI-powered IDE that combines:

- **VSCode Foundation**: Full VSCode OSS compatibility and features
- **Kiro-style Contextual Awareness**: Deep understanding of codebase and project context
- **Cursor-style Code Generation**: AI-powered code completion and generation
- **MCP Puppeteer Integration**: Built-in browser automation for testing and web interaction
- **AI-Integrated Terminal**: Intelligent terminal that AI can see and interact with
- **Mobile-Ready Architecture**: React Native components for future mobile compatibility

## Architecture Plan

```
src/vs/workbench/contrib/
├── ai/                     # AI Orchestrator service
│   ├── orchestrator/       # Main AI coordination
│   ├── contextEngine/      # Kiro-style context awareness
│   ├── codeGeneration/     # Cursor-style code generation
│   └── mcpIntegration/     # MCP protocol integration
├── aiTerminal/            # AI-integrated terminal
├── browserAutomation/     # Puppeteer integration
└── mobileComponents/      # React Native Web components
```

## Development Status

- ✅ **Fork Setup**: Clean VSCode OSS fork created
- ✅ **Build System**: Successfully builds and runs
- ✅ **Dependencies**: All VSCode dependencies installed
- ✅ **Git Setup**: Proper origin/upstream configuration
- ⏳ **AI Features**: To be implemented

## Build Instructions

```bash
# Prerequisites: Node.js 22+
nvm use 22

# Install dependencies
npm install

# Build VSCode
npm run compile

# Run development version
./scripts/code.sh
```

## Git Workflow

```bash
# Sync with upstream VSCode
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/ai-integration

# Push to our fork
git push origin feature/ai-integration
```

## Next Steps

1. Implement AI Orchestrator service
2. Add Kiro-style contextual awareness engine
3. Integrate Cursor-style code generation
4. Add MCP Puppeteer integration
5. Create AI-integrated terminal
6. Implement React Native UI components

## License

This project maintains the same MIT license as VSCode OSS.

---

**Note**: This is a development fork. The goal is to create a production-ready AI-powered IDE while maintaining compatibility with the VSCode ecosystem.