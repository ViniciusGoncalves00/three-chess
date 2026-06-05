import type { IncomingMessage, ServerResponse } from "http";
import { HttpStatus, UserDTORequest, UserValidator } from "@three-chess/common";
import { RequestParser } from "@/request-parser.js";
import type { UserRepository } from "@/domain/ports/user-repository.js";

export class UserController {
    private static repository: UserRepository | null = null;

    public static init(repository: UserRepository): void {
        if (UserController.repository) {
            throw new Error("UserController is already initialized.");
        }
        UserController.repository = repository;
    }

    public static async create(request: IncomingMessage, response: ServerResponse): Promise<void> {
        const body = await RequestParser.json(request);

        const { username, email, password } = body;
        const validation = UserValidator.validate(username, email, password);
        if (!validation.valid) {
            response.writeHead(HttpStatus.BadRequest, {
                "Content-Type": "application/json"
            });
        
            response.end(
                JSON.stringify(validation)
            );
        
            return;
        }

        const userDTORequest = new UserDTORequest(
            username,
            email,
            password
        );

        const userDTOResponse = UserController.repository?.create(userDTORequest);

        if (!userDTOResponse) {
            response.writeHead(HttpStatus.BadRequest, {
                "Content-Type": "application/json"
            });
        
            return;
        }

        response.writeHead(HttpStatus.Created, { "Content-Type": "application/json" });
        response.end(JSON.stringify(userDTOResponse));
    }

    public static read(request: IncomingMessage, response: ServerResponse): void {
        const users = UserController.repository?.findAll();
        response.writeHead(HttpStatus.OK, { "Content-Type": "application/json" });
        response.end(JSON.stringify(users));
        console.log("users", UserController.repository)
    }

    public static update(request: IncomingMessage, response: ServerResponse): void {
        throw new Error("Method not implemented.");
    }

    public static delete(request: IncomingMessage, response: ServerResponse): void {
        throw new Error("Method not implemented.");
    }
}