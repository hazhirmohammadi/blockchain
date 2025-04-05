import Blockchain from "../core/block-chain/blockchain.ts";
import type { MineBlockData } from "../core/block/block.type.ts";

class BlockchainService extends Blockchain {
  constructor() {
    super();
  }

  /**
   * GET: ALL BLOCKS
   * */
  public getBlocks() {
    return this.chain;
  }

  /**
   * POST: ADDED NEW BLOCK
   * */
  public addBlock({ data }: Pick<MineBlockData, "data">) {
    super.addBlock({ data });
  }
}

export default BlockchainService;
