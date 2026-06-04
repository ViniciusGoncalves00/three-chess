import http from "node:http";
import { Router } from "./router.js";
import { HttpMethod } from "@three-chess/common";
import { Database } from "./database/database.js";
import { SQLiteUserRepository } from "./infrastructure/adapters/sqlite-user-repository.js";
import { UserController } from "./presentation/user-controller.js";

const database = new Database();

const userRepository = new SQLiteUserRepository(database.getDatabase());
UserController.init(userRepository);

const server = http.createServer((request, response) => {
    const allowedOrigins = [
        "http://localhost:2000",
        "http://192.168.0.107:2000",
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

    Router.handle(request, response);
});

server.listen(2001);