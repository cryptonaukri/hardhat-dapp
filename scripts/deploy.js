
const hre = require("hardhat");

async function main() {  

  const Counter = await hre.ethers.getContractFactory("Counter");
  const count = await Counter.deploy();

  await count.deployed();

  console.log(
    `Address of deployed Counter contract ${count.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
