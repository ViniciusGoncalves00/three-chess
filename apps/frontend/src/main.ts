import { setupResponseChecker } from "./check-response.js";
import { HttpMethod } from "@three-chess/common";
import { Logger } from "@three-chess/common";

setupResponseChecker("check-health", "response", HttpMethod.GET, "health");
setupResponseChecker("check-get", "response", HttpMethod.GET);
setupResponseChecker("check-post", "response", HttpMethod.POST);
setupResponseChecker("check-put", "response", HttpMethod.PUT);
setupResponseChecker("check-delete", "response", HttpMethod.DELETE);
setupResponseChecker("check-options", "response", HttpMethod.OPTIONS);

setupResponseChecker("check-options", "response", HttpMethod.OPTIONS);

const container = document.querySelector("#logs");

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("fire-log-info")
        ?.addEventListener("click", () =>
            Logger.info("This is an info log"));

    document.getElementById("fire-log-warn")
        ?.addEventListener("click", () =>
            Logger.warning("This is a warning log"));

    document.getElementById("fire-log-error")
        ?.addEventListener("click", () =>
            Logger.error("This is an error log"));
});

Logger.subscribe(entry => {
    container?.insertAdjacentHTML(
        "beforeend",
        `
        <div>
            [${entry.type}]
            ${entry.message}
        </div>
        `
    );
});