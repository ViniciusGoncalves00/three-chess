import { setupResponseChecker } from "./check-response.js";
import { HttpMethod } from "../../../packages/http-methods.js";

setupResponseChecker("check-health", "response", HttpMethod.GET, "health");
setupResponseChecker("check-get", "response", HttpMethod.GET);
setupResponseChecker("check-post", "response", HttpMethod.POST);
setupResponseChecker("check-put", "response", HttpMethod.PUT);
setupResponseChecker("check-delete", "response", HttpMethod.DELETE);
setupResponseChecker("check-options", "response", HttpMethod.OPTIONS);