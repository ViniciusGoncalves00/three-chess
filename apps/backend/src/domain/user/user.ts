import { UserValidator } from "@three-chess/common";

export class User {
    public readonly id: number | null;
    public readonly username: string;
    public readonly email: string;
    public readonly password: string;

    private constructor(id: number | null, username: string, email: string, password: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public static create(username: string, email: string, password: string): User | undefined {
        const validation = UserValidator.validate(username, email, password);
        if (!validation.valid) return;

        return new User(
            null,
            username,
            email,
            password
        );
    }

    public static fromDatabase(id: number, username: string, email: string, password: string): User {
        return new User(
            id,
            username,
            email,
            password
        );
    }
}