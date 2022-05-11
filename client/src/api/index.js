import contract from '../contract';
// import axios from 'axios';
import { ethers } from 'ethers';
import store from '../store'
// import Big from 'bignumber.js'

export default {
    // retrieve all the nft tokens on market
    // render in /explore page
    async getItems() {
        // let n =1;
        let data = await contract.Market_Instance.methods.fetchMarketItems().call();
        data = await Promise.all(data.map(async i => {
            console.log(i);
            let tokenUri =  await contract.Market_Instance.methods.tokenURI(i.tokenId).call();
            let item = {
                price: i.price.toString(),
                tokenId: i.tokenId.toString(),
                seller: i.seller,
                owner: i.owner,
                sold: i.sold,
                tokenUri,
            }
            console.log(item);
            return item;
        }));
        return data;
    },

    // retrieve items that a user has purchased
    async getMyBoughtItems() {
        // let n =1;
        let data = await contract.Market_Instance.methods.fetchMyNFTs().call();
        data = await Promise.all(data.map(async i => {
            console.log(i);
            let tokenUri =  await contract.Market_Instance.methods.tokenURI(i.tokenId).call();
            let item = {
                price: i.price.toString(),
                tokenId: i.tokenId.toString(),
                seller: i.seller,
                owner: i.owner,
                sold: i.sold,
                tokenUri,
            }
            console.log(item);
            return item;
        }));
        return data;
    },

    // token listed
    async getMyListItems() {
        // let n =1;
        let data = await contract.Market_Instance.methods.fetchItemsListed().call();
        data = await Promise.all(data.map(async i => {
            console.log(i);
            let tokenUri =  await contract.Market_Instance.methods.tokenURI(i.tokenId).call();
            let item = {
                price: i.price.toString(),
                tokenId: i.tokenId.toString(),
                seller: i.seller,
                owner: i.owner,
                sold: i.sold,
                tokenUri,
            }
            console.log(item);
            return item;
        }));
        return data;
    },

    // mint a nft token (/create page)
    async createItem(tokenUrl) {
        tokenUrl='https://www.myothertokenlocation22.com';// need to change to inpout
        let price = ethers.utils.parseUnits('0.000000001', 'ether');

        let listingPrice = await contract.Market_Instance.methods.getListingPrice().call();
        listingPrice = listingPrice.toString();
        console.log(listingPrice);

        let reponse = await contract.Market_Instance.methods.createToken(tokenUrl, price).sendBlock({
            from: store.state.dapp.account,
            amount: listingPrice,// change to listingprice
            password:'12345678',//need user input
            gas_price: '20000000000',
            gas:'2000000',
        }, function(error, transactionHash){
            console.log(error, transactionHash);
        });
        console.log(reponse);

        // const START_BLOCK=0
        // await contract.NFT_Instance.getPastEvents('AllEvents', {                               
        //     fromBlock: START_BLOCK,     
        //     toBlock: 'latest'
        // }).then((data) => {
        //     console.log(data);
        // });
    },

    // buy token on market (/explore page)
    async buyItem(token, price) {
        console.log(price);
        //price = ethers.utils.parseUnits(price.toString(), 'ether')   
        let reponse = await contract.Market_Instance.methods.createMarketSale(token.tokenId).sendBlock({
            from: store.state.dapp.account,
            amount: token.price,
            password:'12345678',//need user input
            gas_price: '20000000000',
            gas:'2000000',
        }, function(error, transactionHash){
            console.log(error, transactionHash);
        });
        console.log(reponse);
    },

    // buy token on market (/explore page)
    async resellItem(token, price) {
        let listingPrice= await contract.Market_Instance.methods.getListingPrice().call();
        listingPrice = listingPrice.toString();
        console.log(listingPrice);
        
        price = ethers.utils.parseUnits('0.000000001', 'ether')   
        let reponse = await contract.Market_Instance.methods.resellToken(token.tokenId, price).sendBlock({
            from: store.state.dapp.account,
            amount: listingPrice,
            password:'12345678',//need user input
            gas_price: '20000000000',
            gas:'2000000',
        }, function(error, transactionHash){
            console.log(error, transactionHash);
        });
        console.log(reponse);
    },

}