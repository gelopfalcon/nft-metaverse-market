const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const NFTMarket = await hre.ethers.getContractFactory("NFTGallery");
  const nftMarket = await NFTMarket.deploy();
  await nftMarket.deployed();
  console.log("NFTGallery deployed to:", nftMarket.address);

  const NFT = await hre.ethers.getContractFactory("NFToken");
  const nft = await NFT.deploy(nftMarket.address);
  await nft.deployed();
  console.log("NFToken deployed to:", nft.address);

  let config = `
  export const nftgalleryaddress = "${nftMarket.address}"
  export const nftokenaddress = "${nft.address}"
  `

  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });