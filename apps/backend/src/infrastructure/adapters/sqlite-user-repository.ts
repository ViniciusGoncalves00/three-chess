import BetterSqlite3 from "better-sqlite3";
import type { UserRepository } from "@/domain/ports/user-repository.js";
import { UserDTOResponse, type UserDTORequest } from "@three-chess/common";

export class SQLiteUserRepository implements UserRepository {
    private readonly database: BetterSqlite3.Database;

    public constructor (database: BetterSqlite3.Database) {
        this.database = database;
    }

    public create(user: UserDTORequest): void {
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

        const result = statement.run(user);
    }

    public findAll(): UserDTOResponse[] {
        const statement =
            this.database.prepare(`
                SELECT *
                FROM users
            `);
        
        const rows = statement.all();
        const users: UserDTOResponse[] = rows.map((row: any) => new UserDTOResponse(
            row.id,
            row.username,
            row.email
        ));
        
        return users;
    }

    public findByEmail(email: string): UserDTOResponse | undefined {
        const statement =
            this.database.prepare(`
                SELECT *
                FROM users
                WHERE email = ?
            `);

        const row = statement.get(email);

        if (!row) {
            return undefined;
        }

        // return new UserResponse(
        //     row.id,
        //     row.username,
        //     row.email,
        // );
    }

    public findByName(name: string): UserDTOResponse | undefined {
        throw new Error("Method not implemented.");
    }
}