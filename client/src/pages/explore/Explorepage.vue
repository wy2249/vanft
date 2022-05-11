<template>
<div className="flex justify-center items-center flex-col">
    <h1 className="text-4xl text-emerald-900 font-bold py-5 my-50">Explore Collections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 flex mx-24">
                <div v-for="(nft, i) in nfts" :key="i">
                  <router-link :to="`/nft/${nft.tokenId}`">
                    <div className="border shadow rounded-xl overflow-hidden">
                      <img v-bind:src="nft.tokenUri" className="rounded" />
                      <div className="p-10 bg-white">
                        <h3 className="text-2xl font-bold ">{{nft.name}}</h3>
                        <h5 >{{nft.desc}} </h5>
                      </div>
                    </div>
                    </router-link>
                </div>
      </div>
</div>
</template>



<script>

import { buttonsConfig } from './constants';

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

    methods: {
      async loadNFTs() {
        this.nfts = await services.getItems();
        console.log(this.nfts);
        this.loaded = true;
      },
      link(id) {
        return '/nft/' + id;
      }
    },
    beforeMount() {
        this.loadNFTs();
    }

  };
</script>

