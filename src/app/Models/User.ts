export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    age?: number;
    role: Role;
    token: string;

    constructor(id: number, username: string, password: string, email: string, age: number, role: Role, token: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.age = age;
        this.role = role;
        this.token = token;
    }
}

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}
