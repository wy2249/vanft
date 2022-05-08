import contract from '../contract';
// import axios from 'axios';
import { ethers } from 'ethers';
// import store from '../store'
// import Big from 'bignumber.js'

export default {
    async getItems() {
        // let n =1;
        let data = await contract.Market_Instance.methods.fetchMarketItems().call();
        data = await Promise.all(data.map(async i => {
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

    async createItem(account, tokenUrl) {
        let tokenId = 0;
        let price = ethers.utils.parseUnits('0.000000001', 'ether');
        contract.NFT_Instance.methods.createToken(tokenUrl).call()
            .then(data => {
                tokenId=data.toString();
                console.log('createToken:', data, tokenId);
            })
            .catch(function (error) {
                console.log('error', error)
            });

        // let listingPrice='';
        contract.Market_Instance.methods.getListingPrice().call()
            .then(data => {
                // listingPrice=data.toString();
                console.log('listing price:', data);
            })
            .catch(function (error) {
                console.log('error', error)
            });
        contract.Market_Instance.methods.createMarketItem(
                contract.tokenAddress, 
                1, 
                price,
            )
            .call()
            .catch(function (error) {
                console.log('error', error)
            });
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