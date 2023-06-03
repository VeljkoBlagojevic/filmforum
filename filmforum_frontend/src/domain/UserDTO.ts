import {Role} from "./Role";

export interface UserDTO {
    id: number | null;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    role: Role;
}
