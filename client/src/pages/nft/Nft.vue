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
import { useRoute } from 'vue-router';
import services from "@/api";

export default{
    data() {
      return {
        id: 0,
        nfts: [],
        loaded: false,
      };
    },

    methods: {
      async loadNFTs() {
        this.nfts = await services.getItems();
        console.log(this.nfts);
        this.loaded = true;
      }
    },
    beforeMount() {
      const route = useRoute()
      this.id=route.params.id;
      console.log( this.id);
      this.loadNFTs();
    }

  };
</script>

