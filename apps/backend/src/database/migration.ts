import BetterSqlite3 from "better-sqlite3";

export abstract class Migration {
    public abstract readonly name: string;
    
    public abstract run(database: BetterSqlite3.Database): void;
}