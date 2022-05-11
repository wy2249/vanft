import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import "./plugin.js";
import { createRouter, createWebHistory } from 'vue-router';
import Homepage from './pages/homepage/Homepage.vue';
import ExplorePage from './pages/explore/Explorepage.vue';
import ProfilePage from './pages/profile/Profilepage.vue';
import NFTPage from './pages/nft/Nft.vue';
import CreatePage from './pages/create';

const app = createApp(App);

app.use(store);

const routes = [
  {
    path: '/',
    component: Homepage,
    name: 'homepage',
  },
  {
    path: '/create',
    component: CreatePage,
    name: 'create-nft',
  },
  {
    path: '/explore',
    component: ExplorePage,
    name: 'explore-nft',
  },
  {
    path: '/mycollection/:account',
    component: ProfilePage,
    name: 'my-collection',
  },
  {
    path: "/nft/:id",
    component: NFTPage,
    name: 'nft',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  mode: 'history',
});
app.use(router);
app.mount('#app');
