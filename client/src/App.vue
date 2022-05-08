<template>
  <Header />
  <router-view />
</template>

<script>
import { mapGetters } from "vuex";
import Header from './components/header/Header.vue';
import './index.css';

export default {
  name: 'App',
  components: {
    Header,
  },
  computed: {
    ...mapGetters(["usingAle"]),
  },
  watch: {
    usingAle(val) {
      if (val) {
        this.listenDataChange();
        console.log("listen change");
      }
    },
  },
  methods: {
    handleNetworkChange(networkID) {
      this.$store.commit("M_SET_DAPP_NETWORK", networkID);
    },
    handleLockChange(status) {
      this.$store.commit("IS_ALE_ENABLED", !status);
    },
    handleConnectChange(status) {
      this.$store.commit("M_SET_DAPP_CONNECT", status);
    },
    handleAccountChange(account) {
      this.$store.commit("M_SET_DAPP_ACCOUNT", account);
    },
    listenDataChange() {
      window.aleereum.on("on_networkId_change", this.handleNetworkChange);
      window.aleereum.on("on_islocked_change", this.handleLockChange);
      window.aleereum.on("on_isConnected_change", this.handleConnectChange);
      window.aleereum.on("on_account_change", this.handleAccountChange);
    },
  },
};
</script>
