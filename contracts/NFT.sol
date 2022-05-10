// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  address contractAddress;

  constructor(address marketPlaceAddress) ERC721("Metaverse tokens", "METT") {
    contractAddress = marketPlaceAddress;
  }

  event Print(string s, string s2, address sender, address market, uint256 i);

  function createToken(string memory tokenURI) public returns (uint) {

    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();

    _mint(msg.sender, newItemId);
    _setTokenURI(newItemId, tokenURI);
    setApprovalForAll(contractAddress, true);
    
    emit Print("createToken:", tokenURI, msg.sender, contractAddress, newItemId);

    return newItemId;
  }
}
