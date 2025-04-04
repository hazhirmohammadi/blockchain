export interface BlockData {
  timestamp: string | Date;
  lastHash: string;
  hash: string;
  data: string | any;
  difficulty: number;
  nonce: number;
}

export interface MineBlockData extends Pick<BlockData, "data"> {
  lastBlock: BlockData;
}

export interface aJustDifficulty {
  originalBlock: BlockData;
  timestamp?: number;
}
