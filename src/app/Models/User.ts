export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    age?: number;
    role: RoleEnum;

    constructor(id: number, username: string, password: string, email: string, age: number, role: RoleEnum) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.age = age;
        this.role = role;
    }
}

export enum RoleEnum {
    ADMIN = "ADMIN",
    USER = "USER"
}

export const Role2LabelMapping: Record<RoleEnum, string> = {
    [RoleEnum.ADMIN]: "ADMIN",
    [RoleEnum.USER]: "USER"
};