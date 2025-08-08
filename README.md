# 🔐 SecSafe – Web3 Password Vault Chrome Extension

SecSafe is a decentralized password manager built as a Chrome Extension. It enables users to securely store and manage encrypted login credentials on the Ethereum blockchain using MetaMask.

## 🚀 Features

- 🔐 Store usernames and passwords on-chain with encryption.
- 🔑 Interact securely with MetaMask from the extension.
- 📦 Built with React, TypeScript, and Solidity.
- 💾 Local decryption ensures maximum security.
- 📎 Clean and responsive UI with Headless UI dialogs.
- 🔁 State management using React Context API.

---

## 🧠 Tech Stack

- **Frontend**: React + TypeScript (Vite)
- **Blockchain**: Solidity Smart Contracts
- **Wallet Integration**: MetaMask
- **Storage**: Ethereum (via Smart Contract)

---

## 🧱 Project Structure

```
web3-password-vault/
│
├── public/                   # Static files, popup.html
├── src/
│   ├── components/           # UI components
│   ├── Utils/
│   │   ├── context/          # PasswordVaultContext
│   │   ├── Contracts/        # Solidity contracts
│   │   ├── Helpers/          # Encryption/decryption
│   ├── pages/                # VaultDashboard
│   ├── App.tsx
│   ├── main.tsx
│
├── README.md
└── package.json
```

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/mayank-0407/SecSafe-Vault.git
cd SecSafe-Vault
```

### 2. Install dependencies

```bash
npm install
```

---

## 🔐 MetaMask Requirement

This extension requires MetaMask to be installed. If `window.ethereum` is not available, the extension will show a persistent prompt to install MetaMask.

👉 [Install MetaMask](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)

---

## 🛠️ Development

### Smart Contract

1. Navigate to `/contracts`.
2. Write and compile the contract using Hardhat or Remix.
3. Deploy to your desired network (e.g., Polygon, Ethereum, Sepolia).
4. Update the deployed `contractAddress` in `ethers/constants.ts`.

### Frontend

Start the development server:

```bash
npm run dev
```

---

## 🤝 Contributing

We welcome contributions from the community!

### How to contribute:

1. Fork the repo and create your branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes and commit:
   ```bash
   git commit -m "Add: your message"
   ```
3. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Submit a **Pull Request** with a detailed description.

---

## 📄 License

MIT License

---

## 🙌 Acknowledgements

- [MetaMask](https://metamask.io)
- [Ethers.js](https://docs.ethers.org/)
- [Vite](https://vitejs.dev)
- [Headless UI](https://headlessui.com/)
- [React](https://react.dev)

---

## 💡 Future Improvements

- 🔄 Sync across multiple devices using IPFS or Lighthouse SDK.
- 📱 Mobile extension version.
- 🧠 Integration with biometric security.
- 🌐 Support for multiple chains.

---

> Built with ❤️ for Web3 security by Mayank Aggarwal