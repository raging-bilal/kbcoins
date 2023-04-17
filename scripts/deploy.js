const hre = require("hardhat");

async function main() {
  const KBCoins = await hre.ethers.getContractFactory("KBCoins");
  // const FunTokenSale = await hre.ethers.getContractFactory("FunTokenSale");
  const kbcoins = await KBCoins.deploy(1000000);

  // const tokenPrice = 1000000000000000;

  // const funTokenSale = await FunTokenSale.deploy(funToken.address, tokenPrice);

  await kbcoins.deployed();
  // await funTokenSale.deployed();

  console.log("KBCoins :", kbcoins.address);
  // console.log("FunTokenSale :", funTokenSale.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
