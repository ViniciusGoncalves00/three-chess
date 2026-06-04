import type { HttpMethod } from "@three-chess/common";

const API_URL = import.meta.env.VITE_API_URL;

export async function setupResponseChecker(id: string, targetID: string, method: HttpMethod, resource?: string) {
    const element = document.querySelector(`#${id}`);
    const target = document.querySelector(`#${targetID}`);
    if (!element || !target) return;

    const checkResponse = async () => {
        const input: RequestInfo = resource ? `${API_URL}${resource}` : API_URL;
        const init: RequestInit = {
            method: method
        }
        const response = await fetch(input, init);
        const data = await response.text();
    
        target.innerHTML = `
            <p>${response.status}</p>
            <p>${response.statusText}</p>
            <p>${data}</p>
        `;
    }
    element.addEventListener('click', () => checkResponse())
}
