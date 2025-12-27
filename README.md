            DJCoin — ERC-20 Token From Scratch

DJCoin is a fully ERC-20 compliant token implemented from scratch in Solidity, without using OpenZeppelin or other ERC-20 abstractions.

This project focuses on understanding how ERC-20 works internally, including balance management, allowances, delegated transfers, minting, and event-driven state changes.

            What this project demonstrates :

A complete ERC-20 token implementation written manually

Balance tracking using balanceOf

Token transfers via transfer

Delegated spending via approve and transferFrom

Proper allowance consumption

Owner-controlled minting

Correct Transfer and Approval event emission

Zero-address safety checks

Initial supply minting during deployment

            Why this project exists:

Most real-world tokens rely on OpenZeppelin’s ERC-20 implementation.
This project intentionally avoids external libraries to demonstrate:

How ERC-20 tokens manage balances and allowances internally

Why events are critical for wallets, explorers, and dApps

How delegated spending enables DeFi protocols

The difference between decentralized execution and centralized governance

This repository is meant as a learning and showcase project, not a production token.

            Token details:

Name: DJCoin

Symbol: DC

Decimals: 18

Initial Supply: 1000 DC (minted at deployment)

            Core functions implemented:

transfer(address to, uint256 amount)

approve(address spender, uint256 amount)

transferFrom(address from, address to, uint256 amount)

allowance(address owner, address spender)

mintCoins(uint256 amount) — restricted to the contract owner