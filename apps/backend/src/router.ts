import http from "node:http";
import { userRoutes } from "./presentation/user-routes.js";
import { HttpMethod, HttpStatus } from "@three-chess/common";


export const routes = [
    ...userRoutes,
];

export class Router {
    public static async handle(request: http.IncomingMessage, response: http.ServerResponse): Promise<void> {
        if (request.method == HttpMethod.OPTIONS) {
            response.writeHead(HttpStatus.NoContent);
            response.end();
            return;
        }

        if (request.url == "/health") {
            response.writeHead(HttpStatus.OK, { "Content-Type": "application/json" });
    
            response.end(
                JSON.stringify({
                    status: HttpStatus.OK,
                    message: "Service is running"
                })
            );
    
            return;
        }

        const route = routes.find((route) => route.path == request.url && route.method == request.method);

        if (!route) {
            response.writeHead(HttpStatus.NotFound);
            response.end();
            return;
        }

        route.handler(
            request,
            response
        );
    }
}