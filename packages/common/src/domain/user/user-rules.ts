export const UserRules = {
    USERNAME_MIN_LENGTH: 2,
    USERNAME_MAX_LENGTH: 32,
    USERNAME_REGEX: /^[a-zA-Z0-9_]+$/,
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 256,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;