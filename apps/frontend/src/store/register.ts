import { HttpMethod, HttpStatus, Routes, UserValidator } from "@three-chess/common";
import Alpine from "alpinejs";
import type { Navigator } from "./navigator";
const API_URL = import.meta.env.VITE_API_URL;

export class Register {
    public username = "";
    public email = "";
    public password = "";

    public reset(): void {
        this.username = "";
        this.email = "";
        this.password = "";
    }

    public get valid(): boolean {
        return (
            UserValidator.validateUsername(this.username).valid &&
            UserValidator.validateEmail(this.email).valid &&
            UserValidator.validatePassword(this.password).valid
        );
    }

    public async submit(): Promise<void> {
        if (!this.valid) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}${Routes.USERS}`,
                {
                    method: HttpMethod.POST,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: this.username,
                        email: this.email,
                        password: this.password
                    })
                }
            );
                
            if (response.status === HttpStatus.Created) {
                (Alpine.store("navigator") as Navigator).goHome();

                this.reset();
            }            
                
        } catch (error) {
            console.error(
                `Error creating user: ${String(error)}`
            );
        }
    }
}