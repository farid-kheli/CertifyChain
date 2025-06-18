const { ethers } = require("ethers"); // NOT hardhat
const fs = require("fs");

const PRIVATE_KEY = '0xdc600a193d3e9cc98ad74a97188d4fa5d6227ef05e173f1742d771c861d161bd';

async function main() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545"); // Ganache
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    // Correct file paths for ABI and bytecode
    const abiPath = "./artifacts/contracts/CertificateNFT.sol/cert.abi";
    const bytecodePath = "./artifacts/contracts/CertificateNFT.sol/cert.bin";

    if (!fs.existsSync(abiPath) || !fs.existsSync(bytecodePath)) {
        console.error("ABI or bytecode file not found. Check file paths.");
        return;
    }

    const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
    const bytecode = fs.readFileSync(bytecodePath, "utf8").trim();

    // Validate ABI and bytecode
    if (!Array.isArray(abi) || abi.length === 0) {
        console.error("Invalid ABI format. Ensure the ABI is correctly generated.");
        return;
    }
    if (!bytecode.startsWith("0x") || bytecode.length < 10) {
        console.error("Invalid bytecode format. Ensure the bytecode is correctly generated.");
        return;
    }

    console.log("ABI loaded:", abi);
    console.log("Bytecode loaded:", bytecode);

    console.log("Deploying with wallet:", await wallet.getAddress());

    // Check wallet balance using provider
    const balance = await provider.getBalance(wallet.address);
    console.log("Wallet balance:", ethers.formatEther(balance)); // Correctly access formatEther

    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    console.log("Contract factory created successfully.");

    // Debug constructor inputs
    console.log("Constructor inputs:", factory.interface.fragments.filter(f => f.type === 'constructor'));

    // Debug bytecode length
    console.log("Bytecode length:", bytecode.length);

    try {
        console.log("Attempting to deploy contract...");
        const contract = await factory.deploy({
            gasLimit: 5000000 // Increased gas limit for deployment
        }); // deploy with Ganache signer + provider

        if (!contract.deployTransaction) {
            console.error("Deploy transaction object is undefined.");
            console.log("Possible issues: Check ABI, bytecode, or deployment environment.");
            return;
        }

        console.log("Deploy TX hash:", contract.deployTransaction.hash);
        console.log("Deploy transaction details:", contract.deployTransaction); // Debug transaction details

        await contract.deployed(); // Wait for deployment
        console.log("✅ Contract deployed at:", contract.address); // Log contract address
    } catch (error) {
        console.error("Error during deployment:", error);

        if (error.error && error.error.data && error.error.data.reason) {
            console.error("Revert reason:", error.error.data.reason);
        } else {
            console.error("No revert reason provided.");
        }
    }
}

main().catch(console.error);
