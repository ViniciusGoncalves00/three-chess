import { Countries, Country } from "@three-chess/common";
import type { ValidationResult } from "../../validation-result.js";
import { Validator } from "../../validator.js";
import { UserRules } from "./user-rules.js";

export class UserValidator extends Validator {
    public static validate(username: string, email: string, password: string, dateOfBirth: string, countryCode: string): ValidationResult {
        const usernameValidation = UserValidator.validateUsername(username)
        const emailValidation = UserValidator.validateEmail(email);
        const passwordValidation = UserValidator.validatePassword(password);
        const dateOfBirthValidation = UserValidator.validateDateOfBirth(dateOfBirth);
        const countryValidation = UserValidator.validateCountry(countryCode);

        return this.combine([usernameValidation, emailValidation, passwordValidation, dateOfBirthValidation, countryValidation]);
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

    public static validateDateOfBirth(value: string): ValidationResult {
        const errors: string[] = [];

        const date = new Date(value);
        
        if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
            errors.push("Date of birth is invalid.");
            return this.result(errors);
        }

        const today = new Date();

        if (date > today) {
            errors.push("Date of birth cannot be in the future.");
            return this.result(errors);
        }

        let age = today.getFullYear() - date.getFullYear();

        const birthdayPassed =
            today.getMonth() > date.getMonth() ||
            (
                today.getMonth() === date.getMonth() &&
                today.getDate() >= date.getDate()
            );

        if (!birthdayPassed) {
            age--;
        }

        if (age < UserRules.MINIMUM_AGE) {
            errors.push(
                `You must be at least ${UserRules.MINIMUM_AGE} years old.`
            );
        }

        if (age > UserRules.MAXIMUM_AGE) {
            errors.push("Date of birth is invalid.");
        }

        return this.result(errors);
    }

    public static validateCountry(code: string): ValidationResult {
        const errors: string[] = [];

        if (!Countries.hasCode(code)) {
            errors.push(
                "Country must be a valid ISO 3166-1 alpha-2 code."
            );
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