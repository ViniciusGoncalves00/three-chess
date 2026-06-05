import type { UserDTOResponse, UserDTORequest } from "@three-chess/common";

export interface UserRepository {
    create(user: UserDTORequest): UserDTOResponse | undefined;
    findAll(): UserDTOResponse[];
    findByEmail(email: string): UserDTOResponse | undefined;
    findByName(name: string): UserDTOResponse | undefined;
}