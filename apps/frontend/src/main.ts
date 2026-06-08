import "./style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { setupResponseChecker } from "./check-response.js";
import { HttpMethod, Routes, UserValidator } from "@three-chess/common";
import { Logger } from "@three-chess/common";
import { List } from "./list.js";
import Alpine from 'alpinejs'
import { Navigation } from "./navigation.js";
import { Navigator } from "./store/navigator.js";

const API_URL = import.meta.env.VITE_API_URL;

const navigation = new Navigation();
const navigator = new Navigator(navigation);

Alpine.store("navigator", navigator);
Alpine.store("userValidator", UserValidator);
Alpine.start();

setupResponseChecker("check-health", "response", HttpMethod.GET, "health");
setupResponseChecker("check-get", "response", HttpMethod.GET);
setupResponseChecker("check-post", "response", HttpMethod.POST);
setupResponseChecker("check-put", "response", HttpMethod.PUT);
setupResponseChecker("check-delete", "response", HttpMethod.DELETE);
setupResponseChecker("check-options", "response", HttpMethod.OPTIONS);

setupResponseChecker("check-options", "response", HttpMethod.OPTIONS);


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("fire-log-info")!.addEventListener("click", () => Logger.info("This is an info log"));
    document.getElementById("fire-log-warn")!.addEventListener("click", () => Logger.warning("This is a warning log"));
    document.getElementById("fire-log-error")!.addEventListener("click", () => Logger.error("This is an error log"));
    document.getElementById("fire-log-clear")!.addEventListener("click", () => Logger.clearEntries());

    document.getElementById("get-user")!.addEventListener("click", async () => {
        try {
            const response = await fetch(`${API_URL}${Routes.USERS}`, { method: HttpMethod.GET });
            const data = await response.text();
        
            document.getElementById("users-list")!.innerText = data;
        
        } catch (error) {
            Logger.error(
                `Error creating user: ${String(error)}`
            );
        }
    })

    document.getElementById("create-user")!.addEventListener("click", async () => {
        const username = (document.getElementById("user-name") as HTMLInputElement).value;
        const email = (document.getElementById("user-email") as HTMLInputElement).value;
        const password = (document.getElementById("user-password") as HTMLInputElement).value;

        Logger.info(`Creating user with username: ${username}, email: ${email}, password: ${password}`);

        try {
            const response = await fetch(
                `${API_URL}${Routes.USERS}`,
                {
                    method: HttpMethod.POST,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                }
            );
        
            const data = await response.text();
        
            Logger.info(
                `Status: ${response.status}`
            );
            Logger.info(
                `User created successfully: ${data}`
            );
        
        } catch (error) {
            Logger.error(
                `Error creating user: ${String(error)}`
            );
        }
    });

    const logs = new List(document.getElementById("logs")!);
    Logger.subscribe((entry, isAddition) => {
        const logID = `log-${entry.type}-${entry.timestamp.getTime()}`;
        isAddition ? logs.push(`[${entry.type}] ${entry.message}`, logID) : logs.remove(logID)
    });
});