import axios from 'axios';
import { ethers } from 'ethers';
// import Web3Modal from 'web3modal';
import { nftaddress, nftmarketaddress } from '../../config';
import Homepage from './Homepage';
import Drops from '../../components/drops/Drops.vue';
import { buttonsConfig } from './constants';

import NFT from '../../abis/nft.json';
import Market from '../../abis/market.json';

Homepage.data = () => ({
  buttonsConfig: buttonsConfig,
  nfts: [],
  isLoading: false,
});

Homepage.components = {
  Drops,
};
Homepage.methods = {
  loadNfts: async function() {
    this.isLoading = true;
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();
    const items = await Promise.all(
      data.map(async (item) => {
        const tokenUri = await tokenContract.tokenURI(item.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(item.price.toString(), 'ether');
        let result = {
          price,
          tokenId: item.tokenId.toNumber(),
          seller: item.seller,
          owner: item.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return result;
      })
    );
    this.nfts = items;
    this.isLoading = false;
  },
};
export default Homepage;
