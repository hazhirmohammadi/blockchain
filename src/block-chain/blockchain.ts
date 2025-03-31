import Block from "../block/block.ts";
import type { BlockData, MineBlockData } from "../block/block.type.ts";
import cryptoHash from "../crypto-hash/crypto-hash.ts";

class Blockchain {
  chain: BlockData[] = [];

  constructor() {
    this.chain = [Block.genesis()];
  }

  public addBlock({ data }: Pick<MineBlockData, "data">): void {
    const lastBlock = this.chain[this.chain.length - 1];

    if (!lastBlock) {
      throw new Error("Blockchain must have at least one block.");
    }
    const newBlock: BlockData = Block.mineBlock({
      lastBlock,
      data,
    });

    this.chain.push(newBlock);
  }

  static isValidChain(chain: BlockData[]): boolean | null {
    if (chain.length === 0) return null;

    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const previousBlock = chain[i - 1];

      if (!block || !previousBlock) continue;

      const { hash, timestamp, data, lastHash } = block;

      if (lastHash !== previousBlock.hash) {
        return false;
      }
      if (hash !== cryptoHash(timestamp, lastHash, data)) {
        return false;
      }
    }

    return true;
  }

  public replaceChain(chain: BlockData[]): void {
    if (chain.length <= this.chain.length) {
      console.log("the incoming chain must be longer");
      return;
    }
    if (!Blockchain.isValidChain(chain)) {
      console.log("the incoming chain must be valid");
      return;
    }

    console.log("replacing chain with new chain ", chain);
    this.chain = chain;
  }
}

export default Blockchain;
