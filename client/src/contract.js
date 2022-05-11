import Mcp from "./mcp";

// const nft_abi = require("./../../artifacts/contracts/NFT.sol/NFT.json");
const market_abi = require("./../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json");
import { marketaddress } from "./config.js";
const McpFunc = new Mcp();

McpFunc.Contract.setProvider("http://18.182.45.18:8765");//HUYGENS_dev_URL

//const tokenAddress = "0xDA0A40484198353E7554A77b6Fb87b449bDd875A";//nft contract address
//const marketaddress = "0x73Fd63278C8A522494b892b659Ca238aE4459a76"; //nft market contract address
// const coreAddress = "0x434A2417EDbF809E91E62fe3b213bA51d4B164aD"; //nft market contract address

// const NFT_Instance = new McpFunc.Contract(
//     nft_abi.abi,
//     tokenAddress
// );

const Market_Instance = new McpFunc.Contract(
    market_abi.abi,
    marketaddress
);

const Contract = {
    // tokenAddress,
    // NFT_Instance,
    marketaddress,
    Market_Instance,
    // coreAddress
};

export default Contract;
