import BetterSqlite3, { type Database } from "better-sqlite3";

let database: Database | undefined = undefined;

export function getDatabase(): Database {
    if (!database) {
        database = new BetterSqlite3("database.sqlite");
        database.pragma("journal_mode = WAL");
    }
    return database;
}