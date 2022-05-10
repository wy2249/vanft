const { expect } = require("chai");
const { ethers } = require("hardhat");

async function main() {
    const Market = await ethers.getContractFactory('NFTMarketplace');
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;
    console.log("nft market contract deployed to:", marketAddress);

    // const NFT = await ethers.getContractFactory('NFT');
    // const nft = await NFT.deploy(marketAddress);
    // await nft.deployed();
    // const nftContractAddress = nft.address;
    // console.log("nft contract deployed to:", nftContractAddress);

    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();
    const auctionPrice = ethers.utils.parseUnits('0.000000001', 'ether');
    let t1 = await market.createToken("https://www.mytokenlocation.com", auctionPrice, {value: listingPrice});
    let t2 = await market.createToken("https://www.myothertokenlocation.com", auctionPrice, {value: listingPrice});
    console.log(t1);
    console.log(t2);

    let pre_items = await market.fetchMarketItems();
    console.log("Pre sale:");
    pre_items = await Promise.all(pre_items.map(async i => {
      const tokenUri = await market.tokenURI(i.tokenId)
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

    const signers = await ethers.getSigners()
    /* execute sale of token to another user */
    await market.connect(signers[0]).createMarketSale(1, { value: auctionPrice })

    /* resell a token */
    await market.connect(signers[0]).resellToken(1, auctionPrice, { value: listingPrice })

    /* query for and return the unsold items */
    items = await market.fetchMarketItems()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await market.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)

}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})
