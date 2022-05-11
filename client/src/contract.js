import Mcp from "./mcp";

// const nft_abi = require("./../../artifacts/contracts/NFT.sol/NFT.json");
const market_abi = require("./../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json");

const McpFunc = new Mcp();

McpFunc.Contract.setProvider("http://18.182.45.18:8765");//HUYGENS_dev_URL

//const tokenAddress = "0xDA0A40484198353E7554A77b6Fb87b449bDd875A";//nft contract address
const marketaddress = "0xF7809C2829A11293E50Fb7A78B6411c2Fb649DCF"; //nft market contract address
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
