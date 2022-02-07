import { ethers } from 'hardhat';
import { DecentralizedNFT__factory } from '../typechain-types';

const main = async () => {
  const signer = ethers.provider.getSigner();
  const contract = DecentralizedNFT__factory.connect(
    process.env.CONTRACT_ADDRESS as string,
    signer,
  );

  const tx = await contract.mint(process.env.IPFS_URL as string);
  console.log('tx', tx.hash);
  await tx.wait();
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
