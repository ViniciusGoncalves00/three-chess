import type { IncomingMessage, ServerResponse } from "http";
import { UserDTORequest, UserValidator } from "@three-chess/common";
import { RequestParser } from "@/request-parser.js";
import type { UserRepository } from "@/domain/ports/user-repository.js";

export class UserController {
    private static repository: UserRepository | null = null;

    public static init(repository: UserRepository): void {
        if (this.repository) {
            throw new Error("UserController is already initialized.");
        }
        this.repository = repository;
    }

    public static async create(request: IncomingMessage, response: ServerResponse): Promise<void> {
        const body = await RequestParser.json(request);

        const { username, email, password } = body;
        const validation = UserValidator.validate(username, email, password);
        if (!validation.valid) return;

        const user = new UserDTORequest(
            username,
            email,
            password
        );

        this.repository?.create(user);

        response.writeHead(201);
        response.end();
    }

    public static read(request: IncomingMessage, response: ServerResponse): void {
        const users = this.repository?.findAll();
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(users));
    }

    public static update(request: IncomingMessage, response: ServerResponse): void {
        throw new Error("Method not implemented.");
    }

    public static delete(request: IncomingMessage, response: ServerResponse): void {
        throw new Error("Method not implemented.");
    }
}