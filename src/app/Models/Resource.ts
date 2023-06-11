import { Comment } from "./Comment";
import { ResourceFile } from "./ResourceFile";
import { ResourceType } from "./ResourceType";
import { User } from "./User";

export class Resource {
    id: number;
    title: string;
    description: string;
    clickCount: number;
    price: number;
    resourceType: ResourceType;
    user: User;
    createdAt!: Date;
    updatedAt!: Date;
    comments!: Comment[];
    resourceFiles!: ResourceFile[];
    firstPhotoPath!: string;

    constructor(id: number, title: string, description: string, price: number, clickCount: number, resourceType: ResourceType, user: User) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.clickCount = clickCount;
        this.price = price;
        this.resourceType = resourceType;
        this.user = user;
    }
}
