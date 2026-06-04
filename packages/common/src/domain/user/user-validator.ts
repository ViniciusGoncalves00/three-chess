import type { ValidationResult } from "../../validation-result.js";
import { Validator } from "../../validator.js";
import { UserRules } from "./user-rules.js";

export class UserValidator extends Validator {
    public static validate(username: string, email: string, password: string): ValidationResult {
        const usernameValidation = UserValidator.validateUsername(username)
        const emailValidation = UserValidator.validateEmail(email);
        const passwordValidation = UserValidator.validatePassword(password);

        return this.combine([usernameValidation, emailValidation, passwordValidation]);
    }

    public static validateUsername(username: string): ValidationResult {
        const errors: string[] = [];

        if (username.trim().length < UserRules.MIN_USERNAME_LENGTH) {
            errors.push(
                `Username must contain at least ${UserRules.MIN_USERNAME_LENGTH} characters`
            );
        }

        if (username.length > UserRules.MAX_USERNAME_LENGTH) {
            errors.push(
                `Username must not exceed ${UserRules.MAX_USERNAME_LENGTH} characters`
            );
        }

        return this.result(errors);
    }

    public static validatePassword(password: string): ValidationResult {
        const errors: string[] = [];

        if (password.length < UserRules.MIN_PASSWORD_LENGTH) {
            errors.push(`Password must contain at least ${UserRules.MIN_PASSWORD_LENGTH} characters`);
        }

        if (password.length > UserRules.MAX_PASSWORD_LENGTH) {
            errors.push(`Password must not exceed ${UserRules.MAX_PASSWORD_LENGTH} characters`);
        }

        return this.result(errors);
    }

    public static validateEmail(email: string): ValidationResult {
        const errors: string[] = [];

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push(`Invalid email format`);
        }

        return this.result(errors);
    }
}