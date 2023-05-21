import { Resource } from "./Resource";

export class ResourceFile {
    id: number;
    path: string;
    resource: Resource;

    constructor(id: number, path: string, resource: Resource) {
        this.id = id;
        this.path = path;
        this.resource = resource;
    }
}
