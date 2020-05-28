```
███████╗████████╗██╗  ██╗ █████╗ ███████╗
██╔════╝╚══██╔══╝██║  ██║██╔══██╗██╔════╝
█████╗     ██║   ███████║╚██████║███████╗
██╔══╝     ██║   ██╔══██║ ╚═══██║╚════██║
███████╗   ██║   ██║  ██║ █████╔╝███████║
╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚════╝ ╚══════╝
```                                         

[![circle ci](https://badgen.net/circleci/github/adrianmcli/eth95)](https://circleci.com/gh/adrianmcli/eth95)
[![npm version](https://badgen.net/npm/v/eth95)](https://www.npmjs.com/package/eth95)
![MIT licensed](https://badgen.net/badge/license/MIT/blue)

---

![screenshot](./assets/screenshot.png)

> Instant retro UI for calling any contract function you want

## Features

- 🤙 Call any contract function as long as you have the ABI
- 🔌 Connect via localhost:8545, MetaMask, or a custom node URL
- ⚡ Watches your artifacts folder and automatically updates the UI
- 🔢 Encode your calls for a proxy to call on your behalf
- ⚙️ Set a custom signer or a custom contract address
- 📜 Built-in log for easy visibility

## Install

1. Install

    ```shell
    npm install -g eth95
    ```

2. Run with path to your artifacts folder:

    ```shell
    eth95 ./build/contracts
    ```