import { serve } from "bun";
import type { ServeOptions } from "bun";

import Blockchain from "./src/core/block-chain/blockchain.ts";
import type { BlockData } from "./src/core/block/block.type.ts";
import PubSub from "./src/redis/pubSub.ts";

class Server {
  private readonly blockChain: Blockchain;
  private readonly pubSub: PubSub;

  constructor() {
    this.blockChain = new Blockchain();
    this.pubSub = new PubSub(this.blockChain);

    setTimeout(() => {
      this.pubSub.broadcastChain();
    }, 1000);
  }

  public init(port: number) {
    const option: ServeOptions = {
      port: port,
      fetch: this.router.bind(this),
    };
    serve(option);
  }

  private async router(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    if (method === "GET" && path === "/api/blocks") {
      return this.getBlocks();
    }

    if (method === "POST" && path === "/api/mine") {
      const body = await req.json();
      //@ts-ignore
      const data = body?.data;

      return this.mineBlock(data);
    }

    return new Response("Not Found", { status: 404 });
  }

  private getBlocks(): Response {
    return new Response(JSON.stringify(this.blockChain.chain), {
      headers: { "Content-Type": "application/json" },
    });
  }

  private mineBlock(data: BlockData): Response {
    this.blockChain.addBlock({ data });

    return new Response(JSON.stringify(this.blockChain.chain), {
      status: 201,
      headers: { "Content-Type": "application/json", Location: "/api/blocks" },
    });
  }
}

const server = new Server();
server.init(3000);
