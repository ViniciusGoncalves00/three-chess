import BetterSqlite3 from "better-sqlite3";
import { Migration } from "../migration.js";

export class CreateUsersTable001 extends Migration {
    public readonly name: string ="001_create_users_table";

    public run(database: BetterSqlite3.Database): void {
        database.exec(`
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `);
    }
}