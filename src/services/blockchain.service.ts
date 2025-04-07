import Blockchain from "../core/block-chain/blockchain.ts";
import type { MineBlockData } from "../core/block/block.type.ts";
import PubSub from "../redis/pubSub.ts";

class BlockchainService extends Blockchain {
  private readonly blockChain: Blockchain;
  public pubSub: PubSub;

  constructor() {
    super();
    this.blockChain = new Blockchain();
    this.pubSub = new PubSub(this.blockChain);
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
    this.pubSub.broadcastChain();
  }
}

export default BlockchainService;
