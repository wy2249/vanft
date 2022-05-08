import Mcp from "./mcp";

const nft_abi = require("./abis/NFT.json");
const market_abi = require("./abis/NFTMarket.json");

const McpFunc = new Mcp();

McpFunc.Contract.setProvider("http://13.212.177.203:8765");//HUYGENS_URL

const tokenAddress = "0x446d37bbaF9B4F82bE5393d793AE9aae90D19C48";//nft contract address
const marketaddress = "0x86e0700723b4E0D4D9bF02c6C213354d6fce91fE"; //nft market contract address
const coreAddress = "0x434A2417EDbF809E91E62fe3b213bA51d4B164aD"; //nft market contract address

const NFT_Instance = new McpFunc.Contract(
    nft_abi,
    tokenAddress
);

const Market_Instance = new McpFunc.Contract(
    market_abi,
    marketaddress
);

const Contract = {
    tokenAddress,
    NFT_Instance,
    marketaddress,
    Market_Instance,
    coreAddress
};

export default Contract;
