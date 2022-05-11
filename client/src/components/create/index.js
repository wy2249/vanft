import config from './config';
import Form from './Form.vue';
// import { ethers } from 'ethers';
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

// import { nftaddress, nftmarketaddress } from '../../config';
import services from "@/api";

const NAME_ERROR = 'Insert a name';
const SELECT_FILE_ERROR = 'Select a file';
const SET_DESCRIPTION = 'Describe your NFT';

Form.data = () => ({
  config: config,
  name: '',
  media: '',
  price: '',
  desc: '',
  fileUrl: '',
  errors: [],
  success: 0,
});

Form.methods = {
  submit: async function() {
    this.errors = [];
    if (this.name && this.media && this.price, this.desc) {
      let data = JSON.stringify({
        name: this.name, 
        desc: this.desc, 
        image: this.fileUrl
      })

      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log("token url:", url)
        /* after file is uploaded to IPFS, return the URL to use it in the transaction */

      let reponse = await services.createItem({
          price: this.price,
          name: this.name,
          desc: this.desc,
          tokenUri: url //'https://storage.opensea.io/static/promocards/fashion-promocard.jpeg'
        });
      console.log(reponse);
        if(reponse[0]==1){
          alert("success!");
          this.$router.push("/mycollection");
        } else {
          alert("transaction failed: "+reponse[1]);
          this.$router.go();
        }
    }

    if (!this.name && !this.errors.includes(NAME_ERROR))
      this.errors.push(NAME_ERROR);
    if (!this.media && !this.errors.includes(SELECT_FILE_ERROR))
      this.errors.push(SELECT_FILE_ERROR);
    if (!this.desc && !this.errors.includes(SET_DESCRIPTION))
      this.errors.push(SET_DESCRIPTION);

    console.log(this.name, this.media, this.desc);
  },
  upload: async function(e) {
    this.media = e.target.files[0];
    console.log(this.media);
    console.log("trying to uploda to ipfs");
    try {
      const added = await client.add(
        this.media,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      this.fileUrl = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log("imagee file url: ",this.fileUrl);
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  },
};

export default Form;
