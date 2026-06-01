export const LogType = {
    INFO: "info",
    WARNING: "warning",
    ERROR: "error"
} as const;

export type LogType = typeof LogType[keyof typeof LogType];
export type LogListener = (entry: LogEntry, isAddition?: boolean) => void;

export interface LogEntry {
    timestamp: Date;
    type: LogType;
    message: string;
}

export class Logger {
    private static readonly listeners: LogListener[] = [];
    private static readonly entries: LogEntry[] = [];
    private static readonly MAX_ENTRIES = Infinity;

    public static subscribe(listener: LogListener): void {
        Logger.listeners.push(listener);
    }

    public static unsubscribe(listener: LogListener): void {
        const index = Logger.listeners.indexOf(listener);
        if (index !== -1) {
            Logger.listeners.splice(index, 1);
        }
    }

    public static getEntries(type?: LogType): LogEntry[] {
        if (type) {
            return Logger.entries.filter(entry => entry.type === type);
        }
        return [...Logger.entries];
    }

    public static clearEntries(): void {
        const entries = Logger.entries.splice(0);
        for (const entry of entries) {
            this.notify(entry, false);
        }
    }

    private static notify(entry: LogEntry, isAddition: boolean): void {
        for (const listener of Logger.listeners) {
            listener(entry, isAddition);
        }
    }

    public static info(message: string): void {
        Logger.log(LogType.INFO, message);
    }

    public static warning(message: string): void {
        Logger.log(LogType.WARNING, message);
    }

    public static error(message: string): void {
        Logger.log(LogType.ERROR, message);
    }

    private static log(type: LogType, message: string): void {
        const entry: LogEntry = {
            timestamp: new Date(),
            type,
            message
        }

        this.entries.push(entry);
        
        if (this.entries.length > this.MAX_ENTRIES) {
            const removed = this.entries.shift();
            if (removed) this.notify(removed, false);
        }

        this.notify(entry, true);
    }
}