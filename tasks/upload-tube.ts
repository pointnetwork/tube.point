import { BigNumber, Contract, constants } from 'ethers';
import { task } from 'hardhat/config';
import { promises as fs } from 'fs';
import path from 'path';

task('upload-tube', 'Migrate tube data to a new contract')
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
