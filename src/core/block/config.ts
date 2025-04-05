import type { BlockData } from "./block.type.ts";

export const MINE_RATE: number = 1000;
 const INIT_DIFFICULTY: number = 3;

export const GENESIS_DATA: BlockData = {
  timestamp: "1",
  lastHash: "-----",
  hash: "hash-one",
  data: [],
  difficulty: INIT_DIFFICULTY,
  nonce: 0,
};
