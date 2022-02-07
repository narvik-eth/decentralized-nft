import { Readable } from 'stream';
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.API_KEY, process.env.API_SECRET);
const fs = require('fs');

const main = async () => {
  const imageStream = fs.createReadStream('./metadata/working_rabbit.png');
  let resp = await pinata
    .pinFileToIPFS(imageStream, { pinataMetadata: { name: 'working-rabbit' } })
    .catch((err: any) => {
      console.log(err);
    });

  const metadata = {
    name: 'Working Rabbit',
    image: `https://gateway.pinata.cloud/ipfs/${resp.IpfsHash}`,
  };
  fs.writeFileSync('./metadata/metadata.json', JSON.stringify(metadata));
  const metadataStream = fs.createReadStream('./metadata/metadata.json');
  resp = await pinata
    .pinFileToIPFS(metadataStream, {
      pinataMetadata: { name: 'metadata' },
    })
    .catch((err: any) => {
      console.log(err);
    });
  console.log(`https://gateway.pinata.cloud/ipfs/${resp.IpfsHash}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
