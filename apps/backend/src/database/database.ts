import BetterSqlite3 from "better-sqlite3";

export class Database {
    private readonly database: BetterSqlite3.Database;

    public constructor() {
        this.database = new BetterSqlite3("database.sqlite");
        this.database.pragma("journal_mode = WAL");
    }

    public getDatabase(): BetterSqlite3.Database {
        return this.database;
    }
}