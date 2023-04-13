import { ResourceType } from "./ResourceType";
import { User } from "./User";

export class Resource {
    id: number;
    title: string;
    address!: string;
    description: string;
    price: number;
    resourceType: ResourceType;
    user: User;
    createdAt!: Date;
    updatedAt!: Date;

    constructor(id: number, title: string, description: string, price: number, resourceType: ResourceType, user: User) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.resourceType = resourceType;
        this.user = user;
    }
}
