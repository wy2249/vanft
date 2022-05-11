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
                name: i.name,
                desc: i.desc,
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

    async getOneItem(id) {
        let i = await contract.Market_Instance.methods.fetchOneItem(id).call();
        let tokenUri =  await contract.Market_Instance.methods.tokenURI(i.tokenId).call();
        let item = {
            price: i.price.toString(),
            tokenId: i.tokenId.toString(),
            name: i.name,
            desc: i.desc,
            seller: i.seller,
            owner: i.owner,
            sold: i.sold,
            tokenUri,
        }
        console.log(item);
        return item;
    },

    // retrieve items that a user has purchased
    async getMyBoughtItems() {
        // let n =1;
        let data = await contract.Market_Instance.methods.fetchMyNFTs().call({
            from: store.state.dapp.account
        }
        );
        data = await Promise.all(data.map(async i => {
            console.log(i);
            let tokenUri =  await contract.Market_Instance.methods.tokenURI(i.tokenId).call();
            let item = {
                price: i.price.toString(),
                tokenId: i.tokenId.toString(),
                name: i.name,
                desc: i.desc,
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

    // token listed/created tokens
    async getMyListItems() {
        let data = await contract.Market_Instance.methods.fetchItemsListed().call();
        data = await Promise.all(data.map(async i => {
            console.log(i);
            let tokenUri =  await contract.Market_Instance.methods.tokenURI(i.tokenId).call();
            let item = {
                price: i.price.toString(),
                tokenId: i.tokenId.toString(),
                name: i.name,
                desc: i.desc,
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
    async createItem(nft) {
        console.log(nft.price);
        let price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
        console.log(price);
        
        let listingPrice = await contract.Market_Instance.methods.getListingPrice().call();
        listingPrice = listingPrice.toString();
        console.log(listingPrice);

        let response = await contract.Market_Instance.methods.createToken(nft.tokenUri, price, nft.name, nft.desc).sendBlock({
            from: store.state.dapp.account,
            amount: listingPrice,
            password:'12345678',//need change to user input
            gas_price: '20000000000',
            gas:'2000000',
        }, function(error, transactionHash){
            console.log(error, transactionHash);
            if(error)
                return [0, error];
        });
        console.log(response);
        return [1, response];
    },

    // buy token on market (/explore page)
    async buyItem(token, price) {
        if(token.seller==store.state.dapp.account) {
            console.log("cannot your own token");
            return [0, "cannot your own token"];
        }
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
            if(error)
                return [0, error];
        });
        console.log(reponse);
        return [1,reponse];
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
            if(error)
                return [0, error];
        });
        return [1,reponse];
    },

    getAccount(){
        return store.state.dapp.account;
    },

}