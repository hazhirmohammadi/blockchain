import type { BlockData, MineBlockData } from "./block.type.ts";
import { GENESIS_DATA } from "./config.ts";
import cryptoHash from "../crypto-hash/crypto-hash.ts";

class Block implements BlockData {
  timestamp: string | Date;
  lastHash: string;
  hash: string;
  data: string | any;

  constructor({ timestamp, lastHash, hash, data }: BlockData) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  static genesis() {
    return new Block(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }: MineBlockData): Block {
    const timestamp = new Date().toISOString();
    const lastHash = lastBlock.hash;

    return new Block({
      timestamp: timestamp,
      lastHash: lastBlock.hash,
      data: data,
      hash: cryptoHash(timestamp, lastHash, data),
    });
  }
}

export default Block;
