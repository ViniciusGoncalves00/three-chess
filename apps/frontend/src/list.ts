export class List {
    private readonly container: HTMLElement;
    private readonly options: { showEmptyMessage: boolean, emptyMessage: string };

    public constructor(container: HTMLElement, options?: { showEmptyMessage?: boolean, emptyMessage?: string }) {
        this.container = container;
        this.options = { ...{ showEmptyMessage: true, emptyMessage: "List is empty" }, ...options };

        if (this.needToShowEmptyMessage()) this.showEmptyMessage();
    }

    public push(content: string, ID?: string): void {
        if (this.isShowingEmptyMessage()) this.empty();
        this.container.insertAdjacentHTML("beforeend", `<div id="${ID}">${content}</div>`);
    }

    public remove(ID: string): void {
        document.getElementById(ID)?.remove();
        if (this.needToShowEmptyMessage()) this.showEmptyMessage();
    }

    private isEmpty(): boolean {
        return this.container.children.length === 0;
    }

    private empty(): void {
        this.container.innerHTML = "";
    }

    private needToShowEmptyMessage(): boolean {
        return this.options.showEmptyMessage && this.isEmpty();
    }

    private isShowingEmptyMessage(): boolean {
        return this.options.showEmptyMessage && this.container.innerHTML.includes(this.options.emptyMessage);
    }

    private showEmptyMessage(): void {
        this.container.insertAdjacentHTML("beforeend", `<div>${this.options.emptyMessage}</div>`);
    }
}