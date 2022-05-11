<template>
<div className="flex justify-center items-center flex-col">
    <h1 className="text-4xl text-emerald-900 font-bold py-5 my-50">Explore Collections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 flex mx-24">
                <div v-for="(nft, i) in nfts" :key="i">
                    <div className="border shadow rounded-xl overflow-hidden">
                      <img v-bind:src="nft.tokenUri" className="rounded" />
                      <div className="p-10 bg-white">
                        <h3 className="text-2xl font-bold ">{{nft.name}}</h3>
                        <h5 >{{nft.desc}} </h5>
                      </div>
                    </div>
                </div>
      </div>
</div>
</template>



<script>
// import axios from 'axios';
// import { ethers } from 'ethers';
// import Web3Modal from 'web3modal';
// import { nftaddress, nftmarketaddress } from '../../config';
//import Drops from '../../components/drops/Drops.vue';
import { buttonsConfig } from './constants';

// import NFT from '../../abis/nft.json';
// import Market from '../../abis/market.json';
import services from "@/api";

export default{
    data() {
      return {
        buttonsConfig: buttonsConfig,
        nfts: [],
        loaded: false,
      };
    },
    components: {
      //Drops,
    },
    // mounted:function(){
    //   console.log("load nfts..");
    //   this.nfts = services.getItems();
    //   console.log(this.nfts);
    //   this.loaded = true;
    //   console.log('loaded')
    // },
    methods: {
      async loadNFTs() {
        this.nfts = await services.getItems();
        console.log(this.nfts);
      }
    },
    beforeMount() {
        this.loadNFTs();
    }

    //     this.$router.push('/explore');
    //   },
    //   // loadNfts: async function() {
    //   //   console.log("load nfts...");
    //   //   this.isLoading = true;
    //   //   let n =1;
    //   //   const provider = new ethers.providers.JsonRpcProvider();
    //   //   const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    //   //   const marketContract = new ethers.Contract(
    //   //     nftmarketaddress,
    //   //     Market.abi,
    //   //     provider
    //   //   );
    //   //   const data = await marketContract.fetchMarketItems();
    //   //   const items = await Promise.all(
    //   //     data.map(async (item) => {
    //   //       console.log(n);
    //   //       const tokenUri = await tokenContract.tokenURI(item.tokenId);
    //   //       const meta = await axios.get(tokenUri);
    //   //       let price = ethers.utils.formatUnits(item.price.toString(), 'ether');
    //   //       let result = {
    //   //         price,
    //   //         tokenId: item.tokenId.toNumber(),
    //   //         seller: item.seller,
    //   //         owner: item.owner,
    //   //         image: meta.data.image,
    //   //         name: meta.data.name,
    //   //         description: meta.data.description,
    //   //       };
    //   //       n=n+1;
    //   //       return result;
    //   //     })
    //   //   );
    //   //   console.log(this.nfts);
    //   //   this.nfts = items;
    //   //   this.isLoading = false;
    //   // },
    // },
  };
</script>

