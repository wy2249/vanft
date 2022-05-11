<template>
  <Drops />
</template>


<script>
// import axios from 'axios';
// import { ethers } from 'ethers';
// import Web3Modal from 'web3modal';
// import { nftaddress, nftmarketaddress } from '../../config';
import Drops from '../../components/drops/Drops.vue';
import { buttonsConfig } from './constants';

// import NFT from '../../abis/nft.json';
// import Market from '../../abis/market.json';
import services from "@/api";

export default{
    data() {
      return {
        buttonsConfig: buttonsConfig,
        nfts: [],
        isLoading: false,
      };
    },
    components: {
      Drops,
    },
    mounted:function(){
      this.loadNfts() //method1 will execute at pageload
    },
    methods: {
      loadNfts() {
        services.getItems();
      },
      // loadNfts: async function() {
      //   console.log("load nfts...");
      //   this.isLoading = true;
      //   let n =1;
      //   const provider = new ethers.providers.JsonRpcProvider();
      //   const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
      //   const marketContract = new ethers.Contract(
      //     nftmarketaddress,
      //     Market.abi,
      //     provider
      //   );
      //   const data = await marketContract.fetchMarketItems();
      //   const items = await Promise.all(
      //     data.map(async (item) => {
      //       console.log(n);
      //       const tokenUri = await tokenContract.tokenURI(item.tokenId);
      //       const meta = await axios.get(tokenUri);
      //       let price = ethers.utils.formatUnits(item.price.toString(), 'ether');
      //       let result = {
      //         price,
      //         tokenId: item.tokenId.toNumber(),
      //         seller: item.seller,
      //         owner: item.owner,
      //         image: meta.data.image,
      //         name: meta.data.name,
      //         description: meta.data.description,
      //       };
      //       n=n+1;
      //       return result;
      //     })
      //   );
      //   console.log(this.nfts);
      //   this.nfts = items;
      //   this.isLoading = false;
      // },
    },
  };
</script>

