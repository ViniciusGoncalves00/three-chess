export class UserDTOResponse {
    public readonly id: string;
    public readonly username: string;
    public readonly email: string;

    public constructor(id: string, username: string, email: string) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
}