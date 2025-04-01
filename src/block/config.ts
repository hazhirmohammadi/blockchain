import type { BlockData } from "./block.type.ts";

export const Init_difficulty: number = 3;

export const GENESIS_DATA: BlockData = {
  timestamp: "1",
  lastHash: "-----",
  hash: "hash-one",
  data: [],
  difficulty: Init_difficulty,
  nonce: 0,
};
