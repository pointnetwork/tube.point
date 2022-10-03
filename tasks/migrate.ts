import { BigNumber, Contract, constants } from 'ethers';
import { task } from 'hardhat/config';
import { File} from './types';

async function getLastFileId(contract: Contract) {
  const bloomFilter = contract.filters.FileUploaded();
  const events = await contract.queryFilter(bloomFilter, 0, 'latest');

  const lastEvent = events.pop();

  const lastFileId: BigNumber = lastEvent?.args?.id;
  return lastFileId.toNumber();
}

async function getFileData(contract: Contract, Id: number): Promise<File| undefined> {
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



  task('email-migrate', 'Migrate data to a new contract version')
  .addOptionalParam('oldContractAddress', 'Old contract address')
  .addOptionalParam('newContractAddress', 'New contract address')
  .setAction(async (args, hre) => {
    const { ethers } = hre;
    const { utils } = ethers;
    const { oldContractAddress, newContractAddress } = args;

    if (!utils.isAddress(oldContractAddress)) {
      throw new Error('Invalid old contract address');
    }

    if (!utils.isAddress(newContractAddress)) {
      throw new Error('Invalid new contract address');
    }

    // get last sent email id
    // get all the migrated email ids
    // one by one get the remainig emails and upload it to new contract

    const contractName = 'TubePoint';

    const oldContract = await ethers.getContractAt(contractName, oldContractAddress);
    const newContract = await ethers.getContractAt(contractName, newContractAddress);

    const lastFileId = await getLastFileId(oldContract);

    for (let fileId = 1; fileId <= lastFileId; fileId++) {
      // email already migrated

      console.log('getting email', fileId);
      const fileData = await getFileData(oldContract, fileId);

      if (!fileData) {
        console.log('email missing', fileId);
        continue;
      }

      console.log('migrating', fileId);

      await newContract.addEmailFromMigration(
        fileData.id,
        fileData.from,
        fileData.fileId,
        fileData.title,
        fileData.desc,
        fileData.timestamp
      );

      console.log('done');
    }

    console.log('completed');
  });
