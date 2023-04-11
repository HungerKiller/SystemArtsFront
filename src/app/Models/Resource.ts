import { ResourceType } from "./ResourceType";
import { User } from "./User";

export class Resource {
    id: number;
    title: string;
    address: string;
    description: string;
    price: number;
    resourceType: ResourceType;
    user: User;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, title: string, address: string, description: string, price: number, resourceType: ResourceType, user: User, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.title = title;
        this.address = address;
        this.description = description;
        this.price = price;
        this.resourceType = resourceType;
        this.user = user;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
