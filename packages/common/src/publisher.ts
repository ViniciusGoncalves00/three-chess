export interface Publisher<TArgs extends unknown[]> {
    subscribe(listener: (...args: TArgs) => void): void;
    unsubscribe(listener: (...args: TArgs) => void): void;
    publish(...args: TArgs): void;
}