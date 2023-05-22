import { Resource } from "./Resource";

export class ResourceFile {
    id: number;
    name: string;
    path: string;
    resource: Resource;

    constructor(id: number, path: string, name: string, resource: Resource) {
        this.id = id;
        this.path = path;
        this.name = name;
        this.resource = resource;
    }
}
