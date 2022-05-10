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
    let t1 = await nft.createToken("https://www.mytokenlocation.com", {from: '0x96C4a6b3428A1dD9771dEFFf1280dB1Ad013F65A'});
    let t2 = await nft.createToken("https://www.myothertokenlocation.com", {from: '0x96C4a6b3428A1dD9771dEFFf1280dB1Ad013F65A'});
    console.log(t1, t2);
    console.log(t1.value, t2.value);

    const reponse = await market.createMarketItem(nftContractAddress, 1, auctionPrice, {value: listingPrice});
    const transactionReceipt = await reponse.wait();
    console.log("events:")
    console.log(transactionReceipt.events);
    console.log();

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

    // const signers = await ethers.getSigners();
    // await market.connect(signers[0]).createMarketSale(nftContractAddress, 1, {value: auctionPrice})

    // let items = await market.fetchMarketItems();
    // console.log("Post sale:");
    // items = await Promise.all(items.map(async i => {
    //   const tokenUri = await nft.tokenURI(i.tokenId);
    //   let item = {
    //     price: i.price.toString(),
    //     tokenId: i.tokenId.toString(),
    //     seller: i.seller,
    //     owner: i.owner,
    //     sold: i.sold,
    //     tokenUri,
    //   }
    //   console.log(item);
    // }));

    
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})
