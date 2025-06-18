// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CertificateNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event ConstructorCalled(address indexed deployer);

    constructor() ERC721("CertificateNFT", "CERT") {
        emit ConstructorCalled(msg.sender); // Debugging event
    }

    function mintCertificate(address recipient, string memory tokenURI) public returns (uint256) {
        require(recipient != address(0), "Mint error: recipient cannot be zero address");
        require(bytes(tokenURI).length > 0, "Mint error: tokenURI cannot be empty");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();


        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        require(ownerOf(newTokenId) == recipient, "Mint error: mint failed, recipient mismatch");
        return newTokenId;
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIds.current();
    }

}
