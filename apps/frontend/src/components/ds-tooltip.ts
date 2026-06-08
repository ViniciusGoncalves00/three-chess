import Alpine from 'alpinejs'

export class DSTooltip extends HTMLElement {
    connectedCallback(): void {
        const text = this.getAttribute("text") ?? "";

        this.innerHTML = `
            <span
                x-data="{ open: false }"
                class="relative inline-flex"
            >
                <span
                    @mouseenter="open = true"
                    @mouseleave="open = false"
                    @focus="open = true"
                    @blur="open = false"
                >
                    ${this.innerHTML}
                </span>

                <div
                    x-show="open"
                    x-transition
                    x-transition:enter.delay.500ms
                    x-transition:leave.delay.100ms
                    class="ds-bg-primary ds-border-default absolute left-full top-1/2 -translate-y-1/2 w-max max-w-96 ml-2 px-2 py-1 rounded border text-xs z-50"
                >
                    ${text}
                </div>
            </span>
        `;

        Alpine.initTree(this);
    }
}

customElements.define("ds-tooltip", DSTooltip);