import http from "node:http";
import { userRoutes } from "./presentation/user-routes.js";

export const routes = [
    ...userRoutes,
];

export class Router {
    public static async handle(request: http.IncomingMessage, response: http.ServerResponse): Promise<void> {
        const route = routes.find((route) => route.path === request.url && route.method === request.method);

        if (!route) {
            response.writeHead(404);
            response.end();
            return;
        }

        route.handler(
            request,
            response
        );
    }
}