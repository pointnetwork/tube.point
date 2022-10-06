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
  console.log(lastFileId)
  return lastFileId.toNumber();
}

async function getFileData(contract: Contract, Id: number): Promise<File | undefined> {
    let fileData;
    try {
      fileData = await contract.getVideo(Id);
    } catch (err) {
      return;
    }
  
    const { from, fileId, title, desc, timestamp} = fileData;
  
    if (from === constants.AddressZero) {
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


task('download-tube', 'Downloads files and saves as json objects to a local cache folder')
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
