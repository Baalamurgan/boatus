import { User } from "@prisma/client";

export interface UserResponseTypes {
    message: string;
    user: User[];
}

export interface ErrorResponse {
    message: string;
    error: any;
    target?: string;
}