const app =
    document.querySelector("#app");

async function run() {
    try {
        const response =
            await fetch(
                "http://localhost:3000/health"
            );

        const data =
            await response.json();

        app!.innerHTML = `
            <h1>PWA Running</h1>
            <p>Backend: ${data.status}</p>
        `;
    } catch {
        app!.innerHTML = `
            <h1>PWA Running</h1>
            <p>Backend Offline</p>
        `;
    }
}

run();