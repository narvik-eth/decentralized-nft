//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DecentralizedNFT is ERC721("Decentralized NFT", "DNFT") {
    uint256 public nextTokenId = 1;
    mapping(uint256 => string) public urls;

    function mint(string memory _url) external {
        uint256 tokenId = nextTokenId;
        nextTokenId++;
        urls[tokenId] = _url;
        _safeMint(_msgSender(), tokenId);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        return urls[tokenId];
    }
}
