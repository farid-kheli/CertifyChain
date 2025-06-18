// scripts/owner-certificate.js
const hre = require("hardhat");

async function main() {
  const contractAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853"; // Replace with your deployed contract address
  const tokenId = 1; // Replace with the tokenId you want to query

  console.log("Using contract address:", contractAddress);
  console.log("Querying owner for token ID:", tokenId);

  try {
    const certificateNFT = await hre.ethers.getContractAt("CertificateNFT", contractAddress);
    console.log("Contract instance retrieved successfully.");

    // Directly query the ownerOf function
    const owner = await certificateNFT.ownerOf(tokenId);
    console.log("✅ NFT Owner Address:", owner);
  } catch (error) {
    if (error.message.includes("ERC721: invalid token ID")) {
      console.error(`❌ Token ID ${tokenId} does not exist.`);
    } else {
      console.error("Error querying owner:", error);
    }
  }
}

main().catch((error) => {
  console.error("Script execution error:", error);
  process.exitCode = 1;
});
