import config from './config';
import Form from './Form.vue';
// import { ethers } from 'ethers';
// import { create as ipfsHttpClient } from 'ipfs-http-client';
// import Web3Modal from 'web3modal';

// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

// import { nftaddress, nftmarketaddress } from '../../config';

const NAME_ERROR = 'Insert a name';

const SELECT_FILE_ERROR = 'Select a file';

const SET_DESCRIPTION = 'Describe your NFT';

Form.data = () => ({
  config: config,
  name: '',
  media: '',
  desc: '',
  errors: [],
});

Form.methods = {
  submit: function() {
    this.errors = [];
    if (this.name && this.media && this.desc && this.link) {
      return true;
    }

    if (!this.name && !this.errors.includes(NAME_ERROR))
      this.errors.push(NAME_ERROR);
    if (!this.media && !this.errors.includes(SELECT_FILE_ERROR))
      this.errors.push(SELECT_FILE_ERROR);
    if (!this.desc && !this.errors.includes(SET_DESCRIPTION))
      this.errors.push(SET_DESCRIPTION);
    console.log(this.name, this.media, this.desc, this.link);
  },
  upload: function(e) {
    this.media = e.target.files[0];
    console.log(this.media);
  },
};

export default Form;
