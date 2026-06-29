import { HttpMethod, HttpStatus, Routes, UserValidator, Countries, type Country } from "@three-chess/common";
import Alpine from "alpinejs";
import type { Navigator } from "./navigator";
const API_URL = import.meta.env.VITE_API_URL;

export class Register {
    public username: string = "";
    public email: string = "";
    public password: string = "";
    public date: string = "";
    public country: string = Countries.getDefault().code;

    public readonly countries = Countries.list;

    public reset(): void {
        this.username = "";
        this.email = "";
        this.password = "";
        this.date = "";
        this.country = Countries.getDefault().code;
    }

    public get valid(): boolean {
        return (
            UserValidator.validateUsername(this.username).valid &&
            UserValidator.validateEmail(this.email).valid &&
            UserValidator.validateDateOfBirth(this.date).valid &&
            UserValidator.validateCountry(this.country).valid &&
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
                        password: this.password,
                        dateOfBirth: this.date,
                        country: this.country
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