import { Resource } from "./Resource";
import { User } from "./User";

export class UserFavorite {
    id!: number;
    user: User;
    resource: Resource;

    constructor(user: User, resource: Resource) {
        this.user = user;
        this.resource = resource;
    }
}