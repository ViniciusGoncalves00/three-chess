import "./style.css";
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
    document.getElementById("fire-log-info")!.addEventListener("click", () => Logger.info("This is an info log"));
    document.getElementById("fire-log-warn")!.addEventListener("click", () => Logger.warning("This is a warning log"));
    document.getElementById("fire-log-error")!.addEventListener("click", () => Logger.error("This is an error log"));
    document.getElementById("fire-log-clear")!.addEventListener("click", () => Logger.clearEntries());
});

Logger.subscribe((entry, isAddition) => {
    const logID = `log-${entry.type}-${entry.timestamp.getTime()}`;
    if (!isAddition) {
        document.getElementById(logID)?.remove();
        return;
    }

    container?.insertAdjacentHTML(
        "beforeend",
        `
        <div id="${logID}">
            [${entry.type}]
            ${entry.message}
        </div>
        `
    );
});