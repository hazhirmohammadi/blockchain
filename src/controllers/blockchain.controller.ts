import BlockchainService from "../services/blockchain.service.ts";

class BlockchainController {
  constructor(
    private readonly service: BlockchainService = new BlockchainService(),
  ) {}

  public async getBlocks(): Promise<Response> {
    const blocks = this.service.getBlocks();
    return new Response(JSON.stringify(blocks), {
      headers: { "Content-Type": "application/json" },
    });
  }

  public async mineBlock(req: Request): Promise<Response> {
    // @ts-ignore
    const { data } = await req.json();
    this.service.addBlock(data);
    return new Response(JSON.stringify(this.service.chain), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export default BlockchainController;
