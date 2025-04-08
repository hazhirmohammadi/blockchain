import { serve } from "bun";
import tcpPortUsed from "tcp-port-used";

import type { RouteHandler } from "./src/types/route.type.ts";
import { blockchainRoutes } from "./src/routes/blockchain.route.ts";

import BlockchainService from "./src/services/blockchain.service.ts";

class Server {
  public readonly port: number;
  private readonly routes: {
    method: string;
    path: string;
    handler: RouteHandler;
  }[];

  constructor(port: number) {
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

let PORT: number = 3000;
const blockchainService = new BlockchainService();

tcpPortUsed.check(PORT, "127.0.0.1").then(function (isUse: boolean) {
  if (isUse) PORT += Math.ceil(Math.random() * 1000);
  if (PORT !== blockchainService.rootPort) blockchainService.syncChains();
  Server.init(PORT);
});
