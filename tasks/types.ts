import { BigNumber } from 'ethers';
type Address = string;

export type File = {
  id: BigNumber;
  from: Address;
  fileId: BigNumber;
  title: string;
  desc: string;
  timestamp: BigNumber
};

