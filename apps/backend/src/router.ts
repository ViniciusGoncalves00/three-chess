import http from "node:http";
import { HttpMethod } from "@three-chess/common";
import { HttpStatus } from "@three-chess/common";

export class Router {
    public static handle(request: http.IncomingMessage, response: http.ServerResponse): void {
        if (request.method === HttpMethod.OPTIONS) {
            response.writeHead(HttpStatus.NoContent);
            response.end();
            return;
        }
        
        if (request.method === HttpMethod.GET) {
            return this.get(request, response);
        }
        
        response.writeHead(HttpStatus.NotFound);
        response.end();
    }

    private static get(request: http.IncomingMessage, response: http.ServerResponse): void {
        if (request.url === "/health") {
            response.writeHead(HttpStatus.OK, { "Content-Type": "application/json" });
    
            response.end(
                JSON.stringify({
                    status: HttpStatus.OK,
                    message: "Service is running"
                })
            );
    
            return;
        }
    }
}