import { serve } from "bun";

import Blockchain from "./src/core/block-chain/blockchain.ts";
import PubSub from "./src/redis/pubSub.ts";
import type { RouteHandler } from "./src/types/route.type.ts";
import { blockchainRoutes } from "./src/routes/blockchain.route.ts";

class Server {
  public readonly port: number;

  private readonly blockChain: Blockchain;
  public pubSub: PubSub;

  private readonly routes: {
    method: string;
    path: string;
    handler: RouteHandler;
  }[];

  constructor(port: number) {
    this.blockChain = new Blockchain();
    this.pubSub = new PubSub(this.blockChain);

    this.port = port;

    this.routes = [...blockchainRoutes];
  }

  static init(port: number) {
    const server = new Server(port);
    serve({
      port: server.port,
      fetch: server.router.bind(server),
    });

    console.log(`Server running on http://localhost:${server.port}`);
  }

  private async router(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const method = req.method;
    const path = url.pathname;

    const route = this.routes.find(
      (r) => r.method === method && r.path === path,
    );

    if (route) {
      return route.handler(req);
    }

    return new Response("Not Found", { status: 404 });
  }
}

Server.init(3000);

// class Server {
//   private readonly blockChain: Blockchain;
//   private readonly pubSub: PubSub;
//
//   constructor() {
//     this.blockChain = new Blockchain();
//
//     this.pubSub = new PubSub(this.blockChain);
//
//     setTimeout(() => {
//       this.pubSub.broadcastChain();
//     }, 1000);
//   }
//
//   public init(port: number) {
//     const option: ServeOptions = {
//       port: port,
//       fetch: this.router.bind(this),
//     };
//     serve(option);
//   }
//
//   private async router(req: Request): Promise<Response> {
//     const url = new URL(req.url);
//     const path = url.pathname;
//     const method = req.method;
//
//     if (method === "GET" && path === "/api/blocks") {
//       return this.getBlocks();
//     }
//
//     if (method === "POST" && path === "/api/mine") {
//       const body = await req.json();
//       //@ts-ignore
//       const data = body?.data;
//
//       return this.mineBlock(data);
//     }
//
//     return new Response("Not Found", { status: 404 });
//   }
//
//   private getBlocks(): Response {
//     return new Response(JSON.stringify(this.blockChain.chain), {
//       headers: { "Content-Type": "application/json" },
//     });
//   }
//
//   private mineBlock(data: BlockData): Response {
//     this.blockChain.addBlock({ data });
//
//     return new Response(JSON.stringify(this.blockChain.chain), {
//       status: 201,
//       headers: { "Content-Type": "application/json", Location: "/api/blocks" },
//     });
//   }
// }
