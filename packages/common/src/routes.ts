export const Routes = {
    HOME: "/",
    MATCH: "/match",
    USERS: "/users",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register"
} as const;

export type Routes = typeof Routes[keyof typeof Routes];