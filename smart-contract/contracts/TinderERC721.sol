// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TinderERC721 is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Match Token", "MTK") {}

    function minNFT(
        address _userOne,
        address _userTwo,
        string memory tokenURI
    ) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        //mint nft for userone
        _safeMint(_userOne, tokenId);
        _setTokenURI(tokenId, tokenURI);
        _tokenIdCounter.increment();

        //mint nft for usertwo
        _safeMint(_userTwo, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
}
