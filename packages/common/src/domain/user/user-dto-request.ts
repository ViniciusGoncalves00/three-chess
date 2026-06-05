export class UserDTORequest {
    public readonly username: string;
    public readonly email: string;
    public readonly password: string;

    public constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public toPlainObject() {
        return {
            username: this.username,
            email: this.email,
            password: this.password,
        }
    }
}