import Mcp from "./mcp";

const nft_abi = require("./../../artifacts/contracts/NFT.sol/NFT.json");
const market_abi = require("./../../artifacts/contracts/NFTMarket.sol/NFTMarket.json");

const McpFunc = new Mcp();

McpFunc.Contract.setProvider("http://13.212.177.203:8765");//HUYGENS_URL

const tokenAddress = "0xaF2BA00e5e169Ab889775341ACC027a1AD7b0182";//nft contract address
const marketaddress = "0xA648FbA74Ce16Af1F4a289Aaa80869B9B5e896C2"; //nft market contract address
const coreAddress = "0x434A2417EDbF809E91E62fe3b213bA51d4B164aD"; //nft market contract address

const NFT_Instance = new McpFunc.Contract(
    nft_abi.abi,
    tokenAddress
);

const Market_Instance = new McpFunc.Contract(
    market_abi.abi,
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
