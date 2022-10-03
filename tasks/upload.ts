import { BigNumber, Contract, constants } from 'ethers';
import { task } from 'hardhat/config';
import { promises as fs } from 'fs';
import path from 'path';

/*
Run using one of the following:

npx hardhat upload-emails 0xFbb63f96f7Edb554809eA9209DB96a49215aacdb --network xneptune 
npx hardhat upload-emails 0x64E6F6fBd7a9B84de5fD580d23cEDb2CA4b2b63b --network mainnet 

Will save separate serialized json email objects to 'cache/emails'
*/
task('upload-emails', 'Migrate email data to a new contract')
  .addPositionalParam('contractAddress', 'New contract address')
  .setAction(async (args, hre) => {
    const { ethers } = hre;
    const { utils } = ethers;
    const { contractAddress } = args;

    if (!utils.isAddress(contractAddress)) {
      throw new Error('Invalid contract address');
    }

    const contractName = 'TubePoint';

    const contract = await ethers.getContractAt(contractName, contractAddress);

    const filesFolder = path.resolve(__dirname, '..', 'cache', 'files');
    const filesToUpload = await fs.readdir(filesFolder);

    for (let filesFileName of filesToUpload) {
      console.log(filesFileName);

      const fileData = JSON.parse(
        (await fs.readFile(path.resolve(filesFolder, `${filesFileName}`))).toString()
      );

      console.log('uploading ', BigNumber.from(fileData.id).toNumber());

      const tx = await contract.addFileFromMigration(
        fileData.id,
        fileData.from,
        fileData.fileId,
        fileData.title,
        fileData.desc,
        fileData.timestamp
      );

      await tx.wait();

      console.log('done');
    }

    console.log('completed');
  });
