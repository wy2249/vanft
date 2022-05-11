<template>
  <section class="flex justify-around">
    <div class="w-4/12 my-5 border shadow rounded-xl overflow-hidden">
      <img v-bind:src="nft.tokenUri" className="rounded" />
    </div>

    <div class="w-4/12 text-left flex flex-col px-1 my-10">
      <!-- <h1 className="text-4xl text-emerald-900 font-bold py-5 my-50">nft.name</h1> -->
      <h1
          class="w-12/12 py-5 text-left text-6xl py-2 font-bold tracking-wider	uppercase"
        >
          {{nft.name}}
        </h1>
        <h3
          class="w-12/12 py-5 text-left text-2xl py-2 my-30 font-medium tracking-wider"
        >
          {{nft.desc}}
        </h3>
        <h5
          class="w-12/12 py-5 text-right text-slate-600 text-1xl py-2 font-small tracking-wider"
        >
          Seller: {{nft.seller.slice(0,7)}}..{{nft.owner.slice(-4)}}
        </h5>
        <h5
          class="w-12/12 py-5 text-right text-slate-600 text-1xl py-2 font-small tracking-wider"
        >
          Price: {{nft.price}}
        </h5>
        
        <div class="py-5 flex justify-end">
            <button
              @click="buynft" class=" hover:bg-transparent hover:border-2 border-black hover:text-black dark:hover:bg-transparent dark:hover:border-2 dark:hover:border-white dark:hover:text-white text-xl md:text-2xl px-5 py-5 my-6 text-white bg-black dark:bg-white dark:text-black button"
            >
              Buy
            </button>
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
      };
    },

    methods: {
      async loadNFTs() {
        console.log(this.id);
        this.nft = await services.getOneItem(this.id);
        console.log(this.nft);
        this.loaded = true;
      },

      async buynft() {
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
      }
    },
    beforeMount() {
      const route = useRoute()
      this.id=route.params.id;
      console.log(this.id);
      this.loadNFTs();
    }

  };
</script>

