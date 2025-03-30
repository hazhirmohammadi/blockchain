export interface BlockData {
  timestamp: string | Date;
  lastHash: string;
  hash: string;
  data: string | any;
}

export interface MineBlockData extends Pick<BlockData, "data"> {
  lastBlock: BlockData;
}
