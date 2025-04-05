export type RouteHandler = (req: Request) => Promise<Response> | Response;
