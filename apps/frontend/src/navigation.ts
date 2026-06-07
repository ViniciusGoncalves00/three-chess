import { Routes } from "@three-chess/common";

export class Navigation {
    private readonly history: Routes[] = [];
    private cursor = -1;

    public constructor(initialRoute: Routes = Routes.HOME) {
        this.navigate(initialRoute);
    }

    public navigate(route: Routes): void {
        if (this.cursor < this.history.length - 1) {
            this.history.splice(this.cursor + 1);
        }

        this.history.push(route);
        this.cursor = this.history.length - 1;
    }

    public back(): Routes | null {
        if (!this.canGoBack()) {
            return null;
        }

        this.cursor--;

        return this.history[this.cursor];
    }

    public forward(): Routes | null {
        if (!this.canGoForward()) {
            return null;
        }

        this.cursor++;

        return this.history[this.cursor];
    }

    public clear(): void {
        this.history.length = 0;
        this.cursor = -1;
    }

    public current(): Routes | null {
        if (this.cursor < 0) {
            return null;
        }

        return this.history[this.cursor];
    }

    public canGoBack(): boolean {
        return this.cursor > 0;
    }

    public canGoForward(): boolean {
        return this.cursor < this.history.length - 1;
    }

    public size(): number {
        return this.history.length;
    }
}