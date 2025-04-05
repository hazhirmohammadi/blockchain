import BlockchainController from "../controllers/blockchain.controller.ts";
import type {RouteHandler} from "../types/route.type.ts";

const controller = new BlockchainController();

export const blockchainRoutes: Record<string, RouteHandler> = {
    "GET /api/blocks": () => controller.getBlocks(),
    "POST /api/mine": (req) => controller.mineBlock(req),
};

// class Server {
//     private port: number;
//     private routes: Record<string, RouteHandler>;
//
//     constructor(port: number) {
//         this.port = port;
//         this.routes = {
//             ...blockchainRoutes,
//             // در آینده روت‌های دیگر هم اضافه میشه
//         };
//     }
//
//     public start() {
//         serve({
//             port: this.port,
//             fetch: this.router.bind(this),
//         });
//         console.log(`Server running on http://localhost:${this.port}`);
//     }
//
//     private async router(req: Request): Promise<Response> {
//         const url = new URL(req.url);
//         const key = `${req.method} ${url.pathname}`;
//         const handler = this.routes[key];
//
//         if (handler) {
//             return handler(req);
//         }
//
//         return new Response("Not Found", { status: 404 });
//     }
// }