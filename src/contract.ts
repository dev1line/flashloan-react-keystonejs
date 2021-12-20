import { legos } from "@studydefi/money-legos";
import { ethers, Wallet, Contract } from "ethers";
import kovan from "./kovanConfig";
require("dotenv").config();

const FL = require("../UserInterface-UI/contracts/FlashloanMoneyLego.json");

const contractAddr = FL.networks[kovan.networkID].address;

let provider = ethers.getDefaultProvider("kovan");
let walletPK = `0x${process.env.DEPLOYMENT_ACCOUNT_KEY}`

const wallet = new Wallet(walletPK, provider);
const contractFL = new Contract(contractAddr, FL.abi, wallet);

console.log("contract instance:", contractFL);

const main = async () => {
    const tx = await contractFL.initateFlashLoan(
        legos.erc20.dai.address,
        ethers.utils.parseEther("1000"),
        // [
        //     // [
        //     //      "DAI",
        //     //     legos.erc20.dai.address,
        //     //      ethers.utils.parseEther("100"),
        //     //     legos.erc20.dai.address,
        //     // ],
        //     // {
        //     //     name: "DAI",
        //     //     coin_address: legos.erc20.dai.address,
        //     //     amount: ethers.utils.parseEther("100"),
        //     //     dex_address:legos.erc20.dai.address,
        //     // }
        // ],
  
        {gasLimit: 300000}
    )
    let receipt = await tx.wait();
    console.log("tx:", tx);
    console.log("transaction hash:", receipt.transactionHash)
}
main().then(console.log).catch(console.error)