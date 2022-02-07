import { ethers } from 'hardhat';

const main = async () => {
  const contract = await ethers
    .getContractFactory('DecentralizedNFT')
    .then((factory) => factory.deploy());
  await contract.deployed();

  console.log('DecentralizedNFT deployed to:', contract.address);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
