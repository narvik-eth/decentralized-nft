import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('DecentralizedNFT', () => {
  it('can be deployed', async () => {
    const contract = await ethers
      .getContractFactory('DecentralizedNFT')
      .then((factory) => factory.deploy());
    await contract.deployed();
  });
  it('can be minted', async () => {
    const contract = await ethers
      .getContractFactory('DecentralizedNFT')
      .then((factory) => factory.deploy());
    await contract.deployed();

    const tx = await contract.mint('https://example.com');
    await tx.wait();

    expect(await contract.tokenURI(1)).to.equal('https://example.com');
  });
});
