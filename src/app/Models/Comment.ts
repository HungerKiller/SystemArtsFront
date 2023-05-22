import { User } from "./User";

export class Comment {
    id: number;
    content: string;
    user: User;
    resourceId: number;
    createdAt!: Date;
    updatedAt!: Date;

    constructor(id: number, content: string, user: User, resourceId: number) {
        this.id = id;
        this.content = content;
        this.user = user;
        this.resourceId = resourceId;
    }
}
