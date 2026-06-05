import BetterSqlite3 from "better-sqlite3";
import { CreateUsersTable001 } from "./migrations/001-users-table.js";

export class Migrations {
    private static readonly migrations = [
        new CreateUsersTable001()
    ];

    public static run(database: BetterSqlite3.Database): void {
        database.exec(`
            CREATE TABLE IF NOT EXISTS migrations (
                name TEXT PRIMARY KEY,
                executed_at TEXT NOT NULL
            );
        `);

        for (const migration of this.migrations) {
            const executed =
                database.prepare(`
                    SELECT 1
                    FROM migrations
                    WHERE name = ?
                `).get(migration.name);

            if (executed) {
                continue;
            }

            migration.run(database);

            database.prepare(`
                INSERT INTO migrations (
                    name,
                    executed_at
                )
                VALUES (?, ?)
            `).run(
                migration.name,
                new Date().toISOString()
            );
        }
    }
}