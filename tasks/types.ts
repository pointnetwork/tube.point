import { BigNumber } from 'ethers';
type Address = string;

export type File = {
  id: BigNumber;
  from: Address;
  title: string;
  desc: string;
  fileId: BigNumber;
  timestamp: BigNumber
};

