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

        if (username.trim().length < UserRules.USERNAME_MIN_LENGTH) {
            errors.push(
                `Username must contain at least ${UserRules.USERNAME_MIN_LENGTH} characters.`
            );
        }

        if (username.length > UserRules.USERNAME_MAX_LENGTH) {
            errors.push(
                `Username must not exceed ${UserRules.USERNAME_MAX_LENGTH} characters.`
            );
        }

        if (!UserRules.USERNAME_REGEX.test(username)) {
            errors.push(
                "Username may contain only letters, numbers and underscores."
            );
        }

        return this.result(errors);
    }

    public static validateEmail(email: string): ValidationResult {
        const errors: string[] = [];

        if (!UserRules.EMAIL_REGEX.test(email)) {
            errors.push(`This is not a valid email format.`);
        }

        return this.result(errors);
    }

    public static validatePassword(password: string): ValidationResult {
        const errors: string[] = [];

        if (password.length < UserRules.PASSWORD_MIN_LENGTH) {
            errors.push(`Password must contain at least ${UserRules.PASSWORD_MIN_LENGTH} characters.`);
        }

        if (password.length > UserRules.PASSWORD_MAX_LENGTH) {
            errors.push(`Password must not exceed ${UserRules.PASSWORD_MAX_LENGTH} characters.`);
        }

        return this.result(errors);
    }
}