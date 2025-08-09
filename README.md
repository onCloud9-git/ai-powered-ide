# AI-Powered IDE

[![GitHub Issues](https://img.shields.io/github/issues/onCloud9-git/ai-powered-ide.svg)](https://github.com/onCloud9-git/ai-powered-ide/issues)
[![GitHub Stars](https://img.shields.io/github/stars/onCloud9-git/ai-powered-ide.svg)](https://github.com/onCloud9-git/ai-powered-ide/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/onCloud9-git/ai-powered-ide/blob/main/LICENSE.txt)

## The Repository

This repository is where we develop the AI-Powered IDE - a comprehensive AI-enhanced development environment that combines the best features of VSCode, Kiro, and Cursor. Built on Electron with integrated browser automation and AI-aware terminal functionality. This source code is available to everyone under the standard [MIT license](https://github.com/onCloud9-git/ai-powered-ide/blob/main/LICENSE.txt).

## AI-Powered IDE

<p align="center">
  <img alt="VS Code in action" src="https://user-images.githubusercontent.com/35271042/118224532-3842c400-b438-11eb-923d-a5f66fa6785a.png">
</p>

AI-Powered IDE is a next-generation development environment that combines the familiar VSCode interface with advanced AI capabilities, browser automation, and intelligent terminal integration.

**Key Features:**
- **AI Assistant Integration**: Contextual awareness (Kiro-style) + code generation (Cursor-style)
- **MCP Puppeteer Integration**: Built-in browser automation for testing and web interaction
- **AI-Integrated Terminal**: Intelligent terminal that AI can see and interact with
- **Mobile-Ready Architecture**: React Native components for future mobile compatibility
- **VSCode Foundation**: Familiar interface with extension compatibility
- **Performance Optimized**: Fast startup and responsive AI features

AI-Powered IDE provides comprehensive code editing, navigation, and understanding support along with AI-powered debugging, intelligent code completion, and seamless integration with modern development workflows.

## Contributing

There are many ways in which you can participate in this project, for example:

* [Submit bugs and feature requests](https://github.com/onCloud9-git/ai-powered-ide/issues), and help us verify as they are checked in
* Review [source code changes](https://github.com/onCloud9-git/ai-powered-ide/pulls)
* Contribute to AI engine improvements and new features
* Help with documentation and examples

If you are interested in fixing issues and contributing directly to the code base,
please see the document [How to Contribute](https://github.com/microsoft/vscode/wiki/How-to-Contribute), which covers the following:

* [How to build and run from source](https://github.com/microsoft/vscode/wiki/How-to-Contribute)
* [The development workflow, including debugging and running tests](https://github.com/microsoft/vscode/wiki/How-to-Contribute#debugging)
* [Coding guidelines](https://github.com/microsoft/vscode/wiki/Coding-Guidelines)
* [Submitting pull requests](https://github.com/microsoft/vscode/wiki/How-to-Contribute#pull-requests)
* [Finding an issue to work on](https://github.com/microsoft/vscode/wiki/How-to-Contribute#where-to-contribute)
* [Contributing to translations](https://aka.ms/vscodeloc)

## Feedback

* Ask a question on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode)
* [Request a new feature](CONTRIBUTING.md)
* Upvote [popular feature requests](https://github.com/microsoft/vscode/issues?q=is%3Aopen+is%3Aissue+label%3Afeature-request+sort%3Areactions-%2B1-desc)
* [File an issue](https://github.com/microsoft/vscode/issues)
* Connect with the extension author community on [GitHub Discussions](https://github.com/microsoft/vscode-discussions/discussions) or [Slack](https://aka.ms/vscode-dev-community)
* Follow [@code](https://twitter.com/code) and let us know what you think!

See our [wiki](https://github.com/microsoft/vscode/wiki/Feedback-Channels) for a description of each of these channels and information on some other available community-driven channels.

## Related Projects

Many of the core components and extensions to VS Code live in their own repositories on GitHub. For example, the [node debug adapter](https://github.com/microsoft/vscode-node-debug) and the [mono debug adapter](https://github.com/microsoft/vscode-mono-debug) repositories are separate from each other. For a complete list, please visit the [Related Projects](https://github.com/microsoft/vscode/wiki/Related-Projects) page on our [wiki](https://github.com/microsoft/vscode/wiki).

## Bundled Extensions

VS Code includes a set of built-in extensions located in the [extensions](extensions) folder, including grammars and snippets for many languages. Extensions that provide rich language support (code completion, Go to Definition) for a language have the suffix `language-features`. For example, the `json` extension provides coloring for `JSON` and the `json-language-features` extension provides rich language support for `JSON`.

## Development Container

This repository includes a Visual Studio Code Dev Containers / GitHub Codespaces development container.

* For [Dev Containers](https://aka.ms/vscode-remote/download/containers), use the **Dev Containers: Clone Repository in Container Volume...** command which creates a Docker volume for better disk I/O on macOS and Windows.
  * If you already have VS Code and Docker installed, you can also click [here](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/microsoft/vscode) to get started. This will cause VS Code to automatically install the Dev Containers extension if needed, clone the source code into a container volume, and spin up a dev container for use.

* For Codespaces, install the [GitHub Codespaces](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces) extension in VS Code, and use the **Codespaces: Create New Codespace** command.

Docker / the Codespace should have at least **4 Cores and 6 GB of RAM (8 GB recommended)** to run full build. See the [development container README](.devcontainer/README.md) for more information.

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## License

Copyright (c) Microsoft Corporation. All rights reserved.

Licensed under the [MIT](LICENSE.txt) license.
