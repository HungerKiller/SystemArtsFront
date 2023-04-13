import { Resource } from "./Resource";
import { User } from "./User";

export class Comment {
    id: number;
    content: string;
    user: User;
    resource: Resource;
    createdAt!: Date;
    updatedAt!: Date;

    constructor(id: number, content: string, user: User, resource: Resource) {
        this.id = id;
        this.content = content;
        this.user = user;
        this.resource = resource;
    }
}
