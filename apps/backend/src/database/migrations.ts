import BetterSqlite3 from "better-sqlite3";

export class CreateUsersTableMigration {
    public run(database: BetterSqlite3.Database): void {
        database.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `);
    }
}