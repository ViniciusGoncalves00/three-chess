import { userRoutes } from "@three-chess/common";
import http from "node:http";

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

// export class Router {
//     public static handle(database: BetterSqlite3.Database, request: http.IncomingMessage, response: http.ServerResponse): void {
//         if (request.method === HttpMethod.OPTIONS) {
//             response.writeHead(HttpStatus.NoContent);
//             response.end();
//             return;
//         }
        
//         if (request.method === HttpMethod.GET) {
//             return this.get(database, request, response);
//         }
        
//         response.writeHead(HttpStatus.NotFound);
//         response.end();
//     }

//     private static get(database: BetterSqlite3.Database, request: http.IncomingMessage, response: http.ServerResponse): void {
//         if (request.url === "/health") {
//             response.writeHead(HttpStatus.OK, { "Content-Type": "application/json" });
    
//             response.end(
//                 JSON.stringify({
//                     status: HttpStatus.OK,
//                     message: "Service is running"
//                 })
//             );
    
//             return;
//         }
//     }
// }