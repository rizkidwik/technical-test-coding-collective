export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export interface CreateUserDTO {
    email: string;
    password: string;
    name?: string;
    roles?: Role;
}