# UseWallet Next.js Demo - Proof of State Ep. 14

This demo Next.js project was created to supplement a live-streamed interview on the Proof of State show, to demonstrate how to integrate the [@txnlab/use-wallet](https://github.com/TxnLab/use-wallet) library into a real-world Algorand application.

[<img src="proof-of-state-ep-14.webp" alt="Promo Image" width="640"/>](https://www.youtube.com/live/QH5mFD8RQ68?feature=share)

### Stream Recording 🎬

- [Watch on YouTube](https://www.youtube.com/live/QH5mFD8RQ68?feature=share)

### Connect on Twitter

- **Ryan Fox**: [@ryanRfox](https://twitter.com/ryanRfox)
- **Doug Richar**: [@drichar](https://twitter.com/drichar)

### Algorand Developers YouTube Channel

- https://www.youtube.com/@algodevs/streams

## ✨ Features

- Configured to support [Defly](https://defly.app/), [Pera](https://perawallet.app/), [Daffi](https://www.daffi.me/), [Exodus](https://www.exodus.com/), and [WalletConnect](https://walletconnect.com/) providers
- Demonstrates how `@txnlab/use-wallet` can be used to:
  - Build a wallet menu with provider/account selection
  - Connect to a wallet
  - Sign transactions
  - Send transactions
- Shows balance of connected account, polled every 10 seconds
- [NFDomains](https://app.nf.domains/) integration displaying avatar and NFD name of the connected account (if one exists)
- Uses the following technologies:
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Axios](https://axios-http.com/)
  - [Tanstack Query](https://tanstack.com/query/latest)

## 🔗 Live Demo

- https://use-wallet-demo.vercel.app/

## 💻 Local Development

### Prerequisites

- Node.js v14.18.0 or higher
- [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository

```bash
git clone https://github.com/TxnLab/use-wallet-demo.git
```

2. Change to the project directory

```bash
cd use-wallet-demo
```

3. Install dependencies

```bash
pnpm install
```

4. Start the development server

```bash
pnpm dev
```

### How to Use

This demo app showcases the versatility and capabilities of the `@txnlab/use-wallet` library. You can experiment by tweaking various aspects of the configuration:

1. **Wallet Providers**: Add or remove wallet providers

2. **Algorand Node Configuration**: This demo app connects to Algorand Mainnet. You can change the node configuration to connect to Testnet or Betanet, using [AlgoNode's public nodes](https://algonode.io/api/#free-as-in--algorand-api-access) or your own. Please note that currently only KMD, MyAlgo, and AlgoSigner support Betanet.

3. **WalletConnect Support**: To integrate the WalletConnect provider, you'll need a unique project ID. Obtain it by:
   - Registering an account at [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Creating a new project within your account. Each app needs its own unique project ID.

Full installation and configuration instructions for `@txnlab/use-wallet` can be found in the official repository: [TxnLab/use-wallet](https://github.com/TxnLab/use-wallet). This will guide you through additional features supported by the library that might not be present in this basic example.

## Contact

If you have any questions, suggestions, or would like to collaborate, feel free to get in touch through the following channels:

- **Discord**:
  - New to NFD's Discord? Join using [this invite link](https://discord.gg/w6vSwG5bFK)
  - Already a member? Directly jump to the [#use-wallet channel](https://discord.com/channels/925410112368156732/1039592016704721019)
- **Twitter**: [@drichar](https://twitter.com/drichar)
- **GitHub Discussions**: [Discussion section of use-wallet repository](https://github.com/TxnLab/use-wallet/discussions)

Your feedback and contributions are always welcome!
