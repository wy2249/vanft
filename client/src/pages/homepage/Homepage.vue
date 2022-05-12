<template>
  <section class="flex justify-around">
    <div class="6/12 flex flex-col px-5 my-20">
    
      <h1
        class="w-12/12 py-5 text-left text-4xl py-2 font-bold tracking-wider	uppercase"
      >
        Discover, Collect and Sell 
      </h1>
      <h2
        class="w-8/12 py-5 text-left text-2xl py-2 font-medium tracking-wider	uppercase"
      >
        Version-enabled NFTs
      </h2>

      <div class="py-5 flex justify-between w-8/12">
        <div v-for="button in buttonsConfig" :key="button.title">
          <router-link :to="button.path">
            <button
              class="hover:bg-transparent hover:border-2 border-black hover:text-black dark:hover:bg-transparent dark:hover:border-2 dark:hover:border-white dark:hover:text-white text-xl md:text-2xl px-5 py-5 my-6 text-white bg-black dark:bg-white dark:text-black button"
            >
              {{ button.title }}
            </button>
          </router-link>
        </div>
      </div>

    </div>

    <div class="w-4/12 my-5">
      <img
        src="https://lh3.googleusercontent.com/J734DD96jgdCHK95vKF1lb1sGn2qyxRIo2wF7pDYN3rEoQqZSBTHH2tRecaxgFCux-oIZcJAZSsVYY9xaGhSIZwpkQlh3R6YHf8w=s550"
      />
    </div>
  </section>

  <div className="flex justify-center items-center flex-col">
  <h1 className="text-4xl font-bold py-5 mt-20">Notable Drops</h1>
  </div>
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
// import services from "@/api";

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
    // mounted:function(){
    //   this.loadNfts() //method1 will execute at pageload
    // },
    methods: {
      // loadNfts() {
      //   services.getItems();
      // },
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

