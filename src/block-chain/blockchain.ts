import Block from "../block/block.ts";
import type {BlockData, MineBlockData} from "../block/block.type.ts";

class Blockchain {
  chain: BlockData[] = [];

  constructor() {
    this.chain = [Block.genesis()];
  }

  public addBlock({ data }: Pick<MineBlockData, "data">) {
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
}

export default Blockchain;
