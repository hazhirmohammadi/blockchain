import BlockchainController from "../controllers/blockchain.controller.ts";
import type { RouteHandler } from "../types/route.type.ts";

const controller = new BlockchainController();

export const blockchainRoutes: { method: string; path: string; handler: RouteHandler }[] = [
    {
        method: "GET",
        path: "/api/blocks",
        handler: () => controller.getBlocks(),
    },
    {
        method: "POST",
        path: "/api/mine",
        handler: (req) => controller.mineBlock(req),
    },
];
