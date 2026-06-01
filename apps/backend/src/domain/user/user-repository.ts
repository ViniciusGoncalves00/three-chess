import BetterSqlite3 from "better-sqlite3";
import type { User } from "./user.js";

export class UserRepository {
    private readonly database: BetterSqlite3.Database;

    public constructor(database: BetterSqlite3.Database) {
        this.database = database;
    }

    public create(user: User): void {
        const statement =
            this.database.prepare(`
                INSERT INTO users (
                    username,
                    email,
                    password
                )
                VALUES (
                    @username,
                    @email,
                    @password
                )
            `);

        statement.run({
            username: user.username,
            email: user.email,
            password: user.password
        });
    }
}