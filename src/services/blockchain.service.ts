import Blockchain from "../core/block-chain/blockchain.ts";
import type { MineBlockData } from "../core/block/block.type.ts";
import PubSub from "../redis/pubSub.ts";
import axios from "axios";

class BlockchainService extends Blockchain {
  private readonly blockChain: Blockchain;
  public pubSub: PubSub;
  public rootPort: number = 3000;

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

  async syncChains() {
    const response = await axios.get(
      `http://localhost:${this.rootPort}/api/blocks`,
    );
    this.blockChain.replaceChain(response.data);
  }
}

export default BlockchainService;
