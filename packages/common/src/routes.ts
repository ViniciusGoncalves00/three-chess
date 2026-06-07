export const Routes = {
    HOME: "/",
    USERS: "/users",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register"
} as const;

export type Routes = typeof Routes[keyof typeof Routes];