import { HttpMethod, Routes } from "@three-chess/common";
import { UserController } from "@/presentation/user-controller.js";

export const userRoutes = [
    {
        method: HttpMethod.GET,
        path: Routes.USERS,
        handler: UserController.read
    },
    {
        method: HttpMethod.POST,
        path: Routes.USERS,
        handler: UserController.create
    },
    {
        method: HttpMethod.PUT,
        path: Routes.USERS,
        handler: UserController.update
    },
    {
        method: HttpMethod.DELETE,
        path: Routes.USERS,
        handler: UserController.delete
    },
] as const;