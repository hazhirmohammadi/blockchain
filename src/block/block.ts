import type { BlockData, MineBlockData } from "./block.type.ts";
import { GENESIS_DATA } from "./config.ts";

class Block implements BlockData {
  timestamp: string;
  lastHash: string;
  hash: string;
  data: string;

  constructor({ timestamp, lastHash, hash, data }: BlockData) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  static genesis() {
    return new Block(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }: MineBlockData) {}
}

export default Block;
