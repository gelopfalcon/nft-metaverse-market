# Full stack NFT Gallery built with Alchemy, Solidity, IPFS, & Next.js


## Local setup
To run this project locally, follow these steps.

Clone the project locally, change into the directory, and install the dependencies:
git clone https://github.com/gelopfalcon/nft-metaverse-market.git

cd nft-metaverse-market

# install using NPM or Yarn
npm install

# or

yarn

### Start the local Hardhat node
```
npx hardhat node
```

With the network running, deploy the contracts to the local network in a separate terminal window

```
npx hardhat run scripts/deploy.js --network localhost
```

Start the app

```
npm run dev
```