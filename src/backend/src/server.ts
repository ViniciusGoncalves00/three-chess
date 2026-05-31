import http from "node:http";
import { HttpStatus } from "./http-status.js";
import { HttpMethod } from "../common/http-methods.js";

const server = http.createServer((request, response) => {
    const allowedOrigins = [
        "http://localhost:2000",
        "http://192.168.0.107:2000"
    ];

    const origin = request.headers.origin;

    if (origin && allowedOrigins.includes(origin)) {
        response.setHeader(
            "Access-Control-Allow-Origin",
            origin
        );
    }

    response.setHeader(
        "Access-Control-Allow-Methods",
        `${HttpMethod.GET}, ${HttpMethod.POST}, ${HttpMethod.PUT}, ${HttpMethod.DELETE}, ${HttpMethod.OPTIONS}`
    );

    response.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    if (request.method === HttpMethod.OPTIONS) {
        response.writeHead(HttpStatus.NoContent);
        response.end();
        return;
    }

    if (
        request.method === HttpMethod.GET &&
        request.url === "/health"
    ) {
        response.writeHead(HttpStatus.OK, { "Content-Type": "application/json" });

        response.end(
            JSON.stringify({
                status: HttpStatus.OK,
                message: "Service is running"
            })
        );

        return;
    }

    response.writeHead(404);
    response.end();
});

server.listen(2001);