import contract from '../contract';
// import axios from 'axios';
import { ethers } from 'ethers';
import store from '../store'
// import Big from 'bignumber.js'

export default {
    async getItems() {
        // let n =1;
        let data = await contract.Market_Instance.methods.fetchMarketItems().call();
        data = await Promise.all(data.map(async i => {
            console.log(i);
            let tokenUri =  await contract.NFT_Instance.methods.tokenURI(i.tokenId).call();
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

    async createItem(tokenUrl) {
        tokenUrl='https://www.myothertokenlocation22.com';
        let price = ethers.utils.parseUnits('0.000000001', 'ether');

        let tokenId = await contract.NFT_Instance.methods.createToken(tokenUrl).call();
        console.log(tokenId);
        tokenId=tokenId.toString();
        console.log(tokenId);

        let listingPrice= await contract.Market_Instance.methods.getListingPrice().call();
        listingPrice = listingPrice.toString();
        console.log(listingPrice);

        console.log(contract.tokenAddress);
        const response = await contract.Market_Instance.methods.createMarketItem(
                contract.tokenAddress,
                tokenId, 
                price
            ).sendBlock({
                    from: store.state.dapp.account,
                    amount: listingPrice,
                    password:'12345678',
                    gas_price: '20000000000',
                    gas:'2000000',
            });
        if (response.code==0) {
            console.log('transaction success: ', response);
        } else {
            console.log('transaction failed: ', response);
        }

        let tokenUri =  await contract.NFT_Instance.methods.tokenURI(tokenId).call();
        console.log(tokenUri);

        return response.code, response
    },
        // async getName() {
    //     return await contract.Instance.methods.name().call();
    // },
    // async getSymbol() {
    //     return await contract.Instance.methods.symbol().call();
    // },
    // async approve(limit) {
    //     const approveAmount = new Big(limit).times('1e18').toString();
    //     const response = await contract.Instance.methods.approve(contract.coreAddress, approveAmount).sendToBlock({
    //         from: store.state.dapp.account,
    //         amount: new Big('0').toString()
    //     });

    //     if (response.success) {
    //         console.log('transaction success: ', response);
    //     } else {
    //         console.log('transaction failed: ', response);
    //     }

    //     return response;
    // },
}