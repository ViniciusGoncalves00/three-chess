import type { UserRepository } from "./user-repository.js";
import { User } from "./user.js";

export class UserService {
    private readonly repository: UserRepository;

    public constructor(repository: UserRepository) {
        this.repository = repository;
    }

    public register(username: string, email: string, password: string): void {
        const user = User.create(username, email, password);
        this.repository.create(user);
    }
}