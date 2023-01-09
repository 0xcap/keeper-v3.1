# CAP DEX Keeper Script

Use this Node.js script to execute orders sent on [CAP](https://cap.finance).

## Setup

Create a .env file in the root directory of the repo with:

```
PKEY=YOUR_PRIVATE_KEY
RPC_URL=https://rpc.ankr.com/arbitrum # or any other RPC URL where the contracts are running
TRADE_CONTRACT=TRADE_CONTRACT_ADDRESS
```

Your private key should be set without the leading `0x`.

## Running

```
npm i
node index.js
```