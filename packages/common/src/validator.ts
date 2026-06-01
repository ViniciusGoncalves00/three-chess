import type { ValidationResult } from "./validation-result.js";

export abstract class Validator {
    protected static result(errors: string[]): ValidationResult {
        return {
            valid: errors.length === 0,
            errors
        };
    }

    protected static combine(validations: ValidationResult[]): ValidationResult {
        const errors: string[] = [];

        for (const validation of validations) {
            errors.push(...validation.errors);
        }

        return this.result(errors);
    }
}