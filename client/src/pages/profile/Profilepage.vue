<template>
<div className="flex justify-center items-center flex-col">
    <h3 className="text-4xl text-emerald-900 font-bold py-5 my-50">My Owned Collections</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 flex mx-24">
                <div v-for="(nft, i) in bought_nfts" :key="i">
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

      <div class="py-4">
        <div class="w-full border-t border-gray-300"></div>
      </div>

      <h3 className="text-4xl text-emerald-900 text-center font-bold py-5 my-50">My Listed Collections</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 flex mx-24">
                  <div v-for="(nft, i) in listed_nfts" :key="i">
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
// import { useRoute } from 'vue-router';

export default{
    data() {
      return {
        buttonsConfig: buttonsConfig,
        account: "",
        listed_nfts: [],
        bought_nfts: [],
        loaded: false,
      };
    },
    components: {
      //Drops,
    },

    methods: {
      async loadNFTs() {
        console.log("loading bought nfts (owner is account)...")
        this.bought_nfts = await services.getMyBoughtItems(this.account);
        console.log(this.bought_nfts);

        console.log("loading listed nfts (seller is account)...")
        this.listed_nfts = await services.getMyListItems(this.account);
        console.log(this.listed_nfts);

        this.loaded = true;
      }
    },
    beforeMount() {
      // const route = useRoute()
      // this.account=route.params.account;
      console.log("account: ", this.$store.state.dapp);
      this.account=this.$store.state.dapp.account;
      if (!this.account){
        alert("You need to connect to your ale account");
        this.$router.push('/');
      }
      this.loadNFTs();
    },
    mounted() {
      console.log(this.$store.state.dapp.account,this.account);
      // if(this.$store.state.dapp.account!=this.account) {
      //   alert("invalid: no permission to view this account");
      // }
    }

  };
</script>

