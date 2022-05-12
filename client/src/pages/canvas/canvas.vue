<template>
 

  <div class="flex justify-around">
    
  <div>
  <h1 class="w-12/12 py-5 text-right text-6xl py-2 font-bold tracking-wider	uppercase">
          {{nft.name}}
    </h1>
  <h5 class="w-12/12 py-5 text-right text-slate-600 text-1xl py-2 font-small tracking-wider">
          Originator: {{nft.seller.slice(0,7)}}..{{nft.seller.slice(-4)}}
    </h5>
  </div>
  

<div class="relative">
    <!-- Dropdown toggle button -->
    <button class="flex items-center p-2 bg-white bg-gray-100 rounded-md">
        <span class="mr-4">Versions</span>
    </button>
    <!-- Dropdown list -->
    <div class="absolute right-0 py-2 mt-2 bg-white bg-gray-100 rounded-md shadow-xl w-20">
        <button class="block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-400 hover:text-white">
            1
        </button>
        <button class="block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-400 hover:text-white">
            2
        </button>
        <button class="block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-400 hover:text-white">
            3
        </button>
     </div>
</div>



    <div class="w-5/12 my-5 rounded-xl overflow-hidden">
      <img v-bind:src="nft.tokenUri" className="rounded" />
    </div>

  <div>
  <div>
    <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Description</label
          >
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            v-model="new_desc"
          />
        </div>

    <button
          @click="createNewVersion"
          class="mt-2 bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
  </div>
</div>
  </div>

  
   
</template>



<script>
import { useRoute } from 'vue-router';
import services from "@/api";
import { create } from 'ipfs-http-client';
import {projectId, projectSecret} from './../../../infuraid'

const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
});

export default{
    data() {
      return {
        id: 0,
        nft: {},
        versions:[],
        current_version: 0,
        new_version:'',
        new_desc: '',
        loaded: false,
        isOwner: false,
        isSeller: false,
      };
    },
    methods: {
      async loadNFTs() {
        console.log(this.id);
        this.nft = await services.getOneItem(this.id);
        this.versions = this.nft.versions.split(' ');
        this.new_version = this.versions[0]; //first one by default
        console.log(this.nft, this.versions);
        this.loaded = true;
      },

      set_version(version_id) {
        this.version_id = version_id;
      },

      async createNewVersion() {
        console.log('button submit')
        if (this.new_version && this.new_version) {
          let data = JSON.stringify({
            desc: this.desc, 
            image: this.new_version
          })
          console.log(data);

          // create metadata for this new version
          const added = await client.add(data)
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          console.log("token url:", url)

          // new versions = old versions + this new version
          let reponse = await services.addNewVersion(
            this.id,
            this.nft.versions+' '+url,
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
    }

  };
</script>

