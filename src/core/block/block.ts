import type {
  aJustDifficulty,
  BlockData,
  MineBlockData,
} from "./block.type.ts";
import { GENESIS_DATA, MINE_RATE } from "./config.ts";
import cryptoHash from "../utils/crypto-hash/crypto-hash.ts";
import hexToBinary from "../utils/hex-to-binary/hex-to-binary.ts";

/**
 * Represents a block in the blockchain.
 * @class Block
 * @implements BlockData
 * */
class Block implements BlockData {
  public timestamp: string | Date;
  public lastHash: string;
  public hash: string;
  public data: string | any;
  public difficulty: number;
  public nonce: number;

  /**
   * Here is an example of the block class.
   * @param {BlockData} param0 - requirements data for a block
   * @param {string | Date} param0.timestamp - Construction time block
   * @param {string} param0.lastHash - last hash block
   * @param {string} param0.hash - hash this block
   * @param {any} param0.data - data stored in the block
   * @param {number} param0.difficulty - block mining difficulty
   * @param {number} param0.nonce - counter used in proof of work.
   *
   * */
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

  /**
   * For create a first of block chain (genesis block)
   * */
  static genesis() {
    return new Block(GENESIS_DATA);
  }

  /**
   *  Mine a new block using the previous block and input data
   *
   *  @param {MineBlockData} param - includes new block data and last block data
   *  @param {BlockData} param.lastBlock - last block in chain
   *  @param {any} param.data - desired data stored in block
   *  @returns Block new block
   * */
  static mineBlock({ lastBlock, data }: MineBlockData): Block {
    let hash, timestamp;
    const lastHash: string = lastBlock.hash;
    let { difficulty } = lastBlock;
    let nonce: number = 0;

    do {
      nonce++;
      timestamp = Date.now().toString();
      difficulty = Block.aJustDifficulty({
        originalBlock: lastBlock,
        timestamp: Number(timestamp),
      });
      hash = cryptoHash(timestamp, difficulty, nonce, lastHash, data);
    } while (
      hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty)
    );

    return new Block({
      timestamp: timestamp,
      lastHash: lastBlock.hash,
      data: data,
      hash,
      difficulty,
      nonce,
    });
  }
  /**
   * Change the difficulty based on the time of the previous block mining.
   *
   * If the time between the new block mining and the previous block is more than MINE_RATE, the difficulty is reduced; otherwise, it is increased.
   *
   * @param {aJustDifficulty} param0 - required parameters including the previous block and the current time.
   * @param {BlockData} param0.originalBlock - the previous block in the chain.
   * @param {number} param0.timestamp - the current time the block was mined.
   * @returns {number} the new difficulty.
   */
  static aJustDifficulty({
    originalBlock,
    timestamp,
  }: aJustDifficulty): number {
    const { difficulty } = originalBlock;
    if (difficulty < 1) return 1;
    if (timestamp) {
      if (timestamp - Number(originalBlock.timestamp) > MINE_RATE) {
        return difficulty - 1;
      }
    }

    return difficulty + 1;
  }
}

export default Block;
