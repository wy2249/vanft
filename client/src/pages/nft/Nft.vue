<template>
  <section class="flex justify-around">
    <div class="w-4/12 my-5 border shadow rounded-xl overflow-hidden">
      <img v-bind:src="nft.tokenUri" className="rounded" />
    </div>

    <div class="w-4/12 text-left flex flex-col px-1 my-10">
      <!-- <h1 className="text-4xl text-emerald-900 font-bold py-5 my-50">nft.name</h1> -->
      <h1 class="w-12/12 py-5 text-left text-6xl py-2 font-bold tracking-wider	uppercase">
          {{nft.name}}
        </h1>
        <h3 class="w-12/12 py-5 text-left text-2xl py-2 my-30 font-medium tracking-wider">
          {{nft.desc}}
        </h3>
        <h5 class="w-12/12 py-5 text-right text-slate-600 text-1xl py-2 font-small tracking-wider">
          Originator: {{nft.seller.slice(0,7)}}..{{nft.seller.slice(-4)}}
        </h5>
        <h5
          class="w-12/12 py-5 text-right text-slate-600 text-1xl py-2 font-small tracking-wider"
        >
          Price: {{nft.price}}
        </h5>
        
        <div class="py-5 flex justify-between w-8/12 justify-end">
            <button v-show="!isOwner&&!isSeller" @click="buyNFT" class=" hover:bg-transparent hover:border-2 border-black hover:text-black dark:hover:bg-transparent dark:hover:border-2 dark:hover:border-white dark:hover:text-white text-xl md:text-2xl px-5 py-5 my-6 text-white bg-black dark:bg-white dark:text-black button">
              Buy
            </button>

            <button v-show="isOwner" @click="resellNFT" class=" hover:bg-transparent hover:border-2 border-black hover:text-black dark:hover:bg-transparent dark:hover:border-2 dark:hover:border-white dark:hover:text-white text-xl md:text-2xl px-5 py-5 my-6 text-white bg-black dark:bg-white dark:text-black button">
              Resell
            </button>

            <router-link :to="`/canvas/${id}`">
            <button v-show="isOwner" @click="createNewVersion" class=" hover:bg-transparent hover:border-2 border-black hover:text-black dark:hover:bg-transparent dark:hover:border-2 dark:hover:border-white dark:hover:text-white text-xl md:text-2xl px-5 py-5 my-6 text-white bg-black dark:bg-white dark:text-black button">
              Create Version
            </button>
            </router-link>

      </div>
    </div>
  </section>
</template>



<script>
import { useRoute } from 'vue-router';
import services from "@/api";

export default{
    data() {
      return {
        id: 0,
        nft: {},
        loaded: false,
        isOwner: false,
        isSeller: false,
      };
    },
    methods: {
      async loadNFTs() {
        console.log(this.id);
        this.nft = await services.getOneItem(this.id);
        console.log(this.nft);
        this.loaded = true;
      },

      async buyNFT() {
        let reponse = await services.buyItem(
            this.nft,
            this.nft.price // need to change to input
          );
        console.log(reponse);
        if(reponse[0]==1){
          alert("success!");
          this.$router.push("/mycollection");
        } else {
          alert("transaction failed: "+reponse[1]);
          this.$router.go();
        }
      },

      async resellNFT() {
        let reponse = await services.resellItem(
            this.nft,
            this.nft.price // need to change to input
          );
        console.log(reponse);
        if(reponse[0]==1){
          alert("success!");
          this.$router.push("/mycollection");
        } else {
          alert("transaction failed: "+reponse[1]);
          this.$router.go();
        }
      },

      checkOwner() {
        let account = services.getAccount();
        console.log("cheking if onwer is account");
        console.log(account, account==this.nft.owner);
        return account==this.nft.owner;
      },

      checkSeller() {
        let account = services.getAccount();
        console.log("cheking if seller is account");
        return account==this.nft.seller;
      },

    },
    beforeMount() {
      const route = useRoute()
      this.id=route.params.id;
      console.log(this.id);
      this.loadNFTs();
    },
    mounted() {
      this.isOwner = this.checkOwner();
      this.isSeller = this.checkSeller();
    }

  };
</script>

