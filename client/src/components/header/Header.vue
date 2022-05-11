<template>
  <nav
    class="bg-white sticky top-0 z-50 px-4 py-5 items-center flex justify-between text-black"
  >
    <router-link to="/">
      <div class="cursor-pointer flex lg:w-4/12 relative">
        <img
          class="w-full"
          src="/logo.png"
          alt=“Logo“
        />
        <span class="uppercase py-4 px-4 font-bold text-3xl justify-center lg:flex"> VANFT </span>
      </div>
    </router-link>

    <ul class="hidden lg:flex w-8/12 justify-center">
      <li v-for="item in config" :key="item.title">
        <div class="relative">
          <router-link :to="item.path">
            <span class="uppercase py-4 px-4 font-bold text-2xl">{{
              item.title
            }}</span>
          </router-link>
        </div>
      </li>
    </ul>

    <button v-show="!isConnected" @click="connect" class="uppercase py-4 px-4 font-bold text-lg lg:flex w-2/12 justify-center">
      Connect Ale
    </button>
    <button v-show="isConnected" @click="disconnect" class="uppercase py-4 px-4 font-bold text-lg lg:flex w-2/12 justify-center">
      {{account.slice(0,7)}}...{{account.slice(-4)}}
    </button>
    <button v-show="isConnected" @click="createnft">create nft</button>
    <button v-show="isConnected" @click="buynft">buy nft</button>
    <button v-show="isConnected" @click="listnft">list nft</button>
    <button v-show="isConnected" @click="listmynft">list my nft</button>
    <button v-show="isConnected" @click="resellnft">sell my nft</button>
  
  </nav>
</template>

<script>
import {config} from './config';
import services from "@/api";


export default{
    data() {
      return {
        config: config,
        account: "",
        isConnected: false,
      };
    },
    watch: {
      "$store.state.dapp": {
        handler(val) {
            console.log(val);
            this.account = val.account;
            this.isConnected = val.isConnected;
            console.log("status: "+this.isConnected);
        },
        immediate: true,
        deep: true,
      },
    },
    methods: {
      connect() {
        console.log("connecting to Ale wallet...");
        window["aleereum"] && window["aleereum"].connect();
      },
      disconnect() {
        console.log("disconnecting to Ale wallet...");
        window["aleereum"] && window["aleereum"].open();
      },
      createnft() {
        if (this.isConnected){
          services.createItem("www.sample.com");
        }
      },
      listnft() {
        if (this.isConnected){
          services.getItems();
        }
      },
      listmynft() {
        if (this.isConnected){
          services.getMyListItems();
        }
      },
      buynft() {
        if (this.isConnected){
          services.buyItem(
            {
              owner: "0x2313c27fb330Ae511366aB95f917B3D520BADa79",
              price: "1000000000",
              seller: "0x96C4a6b3428A1dD9771dEFFf1280dB1Ad013F65A",
              sold: false,
              tokenId: "1",
              tokenUri: "https://www.mytokenlocation.com"
            },
            1000000000
          );
        }
      },
      resellnft() {
        if (this.isConnected){
          services.resellItem(
            {
              owner: "0x2313c27fb330Ae511366aB95f917B3D520BADa79",
              price: "1000000000",
              seller: "0x96C4a6b3428A1dD9771dEFFf1280dB1Ad013F65A",
              sold: false,
              tokenId: "1",
              tokenUri: "https://www.mytokenlocation.com"
            },
            0.000000001
          );
        }
      }
      // approveMoney() {
      // services.getName().then(res => {
      //   console.log(res);
      // });
      // services.approve(100).then((res) => {
      //   console.log(res);
      // });
    // },
    },
  };
</script>
