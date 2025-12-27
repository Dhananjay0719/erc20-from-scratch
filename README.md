                        DJCoin — ERC-20 Token From Scratch

DJCoin is a fully ERC-20 compliant token implemented from scratch in Solidity, without using OpenZeppelin.
The project demonstrates a deep understanding of ERC-20 mechanics, including balances, allowances, minting, and event-driven state changes.

The goal of this repository is to show how ERC-20 tokens work internally rather than relying on pre-built abstractions.

Features :

• ERC-20 compliant token implementation
• Supports balanceOf, transfer, approve, and transferFrom
• Proper allowance management with consumption after delegated transfers
• Owner-controlled minting mechanism
• Correct Transfer and Approval event emission
• Zero-address safety checks
• Initial token supply minted at deployment

Why this project exists :

Most real-world tokens rely on OpenZeppelin libraries.
This project intentionally avoids external abstractions to demonstrate:

• How ERC-20 tokens function internally
• How balances and allowances are stored and updated
• Why events are critical for wallet, explorer, and dApp visibility
• How delegated spending enables DeFi use cases

Token details :

Name: DJCoin
Symbol: DC
Decimals: 18
Initial Supply: 1000 DC

Core functions implemented :

• transfer(address to, uint256 amount)
• approve(address spender, uint256 amount)
• transferFrom(address from, address to, uint256 amount)
• allowance(address owner, address spender)
• mintCoins(uint256 amount) — restricted to the contract owner

Testing :

Basic Hardhat tests are included to validate:

• Initial supply assignment to the owner
• Token transfer functionality
• Approval and allowance consumption
• Owner-only minting restrictions

Tests can be run using:

npx hardhat test
