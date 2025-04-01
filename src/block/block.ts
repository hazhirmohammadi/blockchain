import type { BlockData, MineBlockData } from "./block.type.ts";
import { GENESIS_DATA } from "./config.ts";
import cryptoHash from "../crypto-hash/crypto-hash.ts";

class Block implements BlockData {
  public timestamp: string | Date;
  public lastHash: string;
  public hash: string;
  public data: string | any;
  public difficulty: number;
  public nonce: number;

  constructor({
    timestamp,
    lastHash,
    hash,
    data,
    difficulty,
    nonce,
  }: BlockData) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.difficulty = difficulty;
    this.nonce = nonce;
  }

  static genesis() {
    return new Block(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }: MineBlockData): Block {
    let hash, timestamp;
    const lastHash: string = lastBlock.hash;
    const { difficulty } = lastBlock;
    let nonce: number = 0;

    do {
      nonce++;
      timestamp = new Date().toISOString();
      hash = cryptoHash(timestamp, difficulty, nonce, lastHash, data);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    return new Block({
      timestamp: timestamp,
      lastHash: lastBlock.hash,
      data: data,
      hash,
      difficulty,
      nonce,
    });
  }
}

export default Block;
