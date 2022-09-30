import { BigNumber, Contract, constants } from 'ethers';
import { task } from 'hardhat/config';
import { promises as fs } from 'fs';
import path from 'path';
import { File } from './types';


async function getLastFileId(contract: Contract) {
  const bloomFilter = contract.filters.FileUploaded();
  const events = await contract.queryFilter(bloomFilter, 0, 'latest');

  const lastEvent = events.pop();

  const lastFileId: BigNumber = lastEvent?.args?.id;
  return lastFileId.toNumber();
}

async function getFileData(contract: Contract, Id: number): Promise<File | undefined> {
    let fileData;
    try {
      fileData = await contract.getFileById(Id);
    } catch (err) {
      return;
    }
  
    const { from, fileId, title, desc, timestamp} = fileData;
  
    if (from == constants.AddressZero) {
      return;
    }
  
    return {
      id: BigNumber.from(Id),
      from,
      fileId,
      title,
      desc,
      timestamp
    };
  }


/*
Run using one of the following:

npx hardhat download-emails 0x636a49eD801031aC3d5B3D89bA6f5b7114631EC6 --network ynet 
npx hardhat download-emails 0x0717C9adB941943AdDd422491Add265b633bbd01 --network xpluto 
npx hardhat download-emails 0xFbb63f96f7Edb554809eA9209DB96a49215aacdb --network xneptune 
npx hardhat download-emails 0x64E6F6fBd7a9B84de5fD580d23cEDb2CA4b2b63b --network mainnet 

Will save separate serialized json email objects to 'cache/emails'
*/
task('download-files', 'Downloads files and saves as json objects to a local cache folder')
  .addPositionalParam('contractAddress', 'The Point Tube Contract Address to download Files from')
  .setAction(async (args, hre) => {
    const { ethers } = hre;
    const { utils } = ethers;
    const { contractAddress } = args;

    if (!utils.isAddress(contractAddress)) {
      throw new Error('Invalid old contract address');
    }

    const contractName = 'TubePoint';

    const contract = await ethers.getContractAt(contractName, contractAddress);
    const lastFileId = await getLastFileId(contract);
    
    console.log('*** Starting downloading for ' + lastFileId + ' Files ***')

    const filesFolder = path.resolve(__dirname, '..', 'cache', 'files');

    try {
      await fs.mkdir(filesFolder);
    } catch (error) {}

    for (let fileId = 1; fileId <= lastFileId; fileId++) {
      const filePath = path.resolve(filesFolder, `${fileId}.json`);
      try {
        await fs.open(filePath, 'r');
        console.log(fileId, 'already saved');
        continue;
      } catch (error) {}

      const fileData = await getFileData(contract, fileId);

      if (!fileData) {
        console.log('file missing', fileId);
        continue;
      }

      console.log('saving', fileId);

      await fs.writeFile(filePath, JSON.stringify(fileData));

      console.log('done');
    }

    console.log('completed');
  });
