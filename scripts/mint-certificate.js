const hre = require("hardhat");

async function main() {
  const contractAddress = "0xcE262762d06331A07438528E5051b178D06bcdA5";
  const recipient = "0x219B399e23C68726876F17C079D8b35c1a7Ad5B0b";
  const tokenURI = "ipfs://QmSxL6ReLRSHiAMuMijVFBC9zfBcr8KuLsQUNjjbXry1BB"; 
  console.log("Using contract address:", contractAddress);
  console.log("Minting certificate for recipient:", recipient);

  try {
    const certificateNFT = await hre.ethers.getContractAt("CertificateNFT", contractAddress);
    console.log("Contract instance retrieved successfully.");

    const tx = await certificateNFT.mintCertificate(recipient, tokenURI);
    console.log("Minting transaction sent. Waiting for confirmation...");

    await tx.wait();
    console.log("✅ Certificate minted successfully!");
  } catch (error) {
    console.error("Error minting certificate:", error);
  }
}

main().catch((error) => {
  console.error("Script execution error:", error);
  process.exitCode = 1;
});
