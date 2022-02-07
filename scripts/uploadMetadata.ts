import * as fs from 'fs';
import * as pinataSDK from '@pinata/sdk';

const pinata = pinataSDK.default(
  process.env.API_KEY as string,
  process.env.API_SECRET as string,
);

const main = async () => {
  const pinataOptions: pinataSDK.PinataOptions = {
    cidVersion: 1,
  };

  const imageStream = fs.createReadStream('./metadata/working_rabbit.png');
  let resp = await pinata.pinFileToIPFS(imageStream, {
    pinataMetadata: { name: 'working-rabbit' },
    pinataOptions,
  });

  const metadata = {
    name: 'Working Rabbit',
    image: `ipfs://${resp.IpfsHash}`,
  };
  fs.writeFileSync('./metadata/metadata.json', JSON.stringify(metadata));
  const metadataStream = fs.createReadStream('./metadata/metadata.json');
  resp = await pinata.pinFileToIPFS(metadataStream, {
    pinataMetadata: { name: 'metadata' },
    pinataOptions,
  });
  console.log(`ipfs://${resp.IpfsHash}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
