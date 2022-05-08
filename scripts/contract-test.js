const { expect } = require("chai");
const { ethers } = require("hardhat");

async function main() {
    const Market = await ethers.getContractFactory('NFTMarket');
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;
    console.log("nft market contract deployed to:", marketAddress);

    const NFT = await ethers.getContractFactory('NFT');
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftContractAddress = nft.address;
    console.log("nft contract deployed to:", nftContractAddress);

    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();
    const auctionPrice = ethers.utils.parseUnits('0.000000001', 'ether');
    await nft.createToken("https://www.mytokenlocation.com");
    await nft.createToken("https://www.myothertokenlocation.com");
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {value: listingPrice});
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {value: listingPrice});

    let pre_items = await market.fetchMarketItems();
    console.log("Pre sale:");
    pre_items = await Promise.all(pre_items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId);
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        tokenUri,
      }
      console.log(item);
    }));

    const signers = await ethers.getSigners();
    await market.connect(signers[0]).createMarketSale(nftContractAddress, 1, {value: auctionPrice})

    let items = await market.fetchMarketItems();
    console.log("Post sale:");
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId);
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        tokenUri,
      }
      console.log(item);
    }));

    
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})
