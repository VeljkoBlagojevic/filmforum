import {Role} from "../../domain/Role";

interface RegisterRequest {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    role: Role;
}

export default RegisterRequest;
