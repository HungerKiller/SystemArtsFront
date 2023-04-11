import { Resource } from "./Resource";
import { User } from "./User";

export class UserFavorite {
    id: number;
    user: User;
    resource: Resource;

    constructor(id: number, user: User, resource: Resource) {
        this.id = id;
        this.user = user;
        this.resource = resource;
    }
}