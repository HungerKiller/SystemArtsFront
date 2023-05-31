import { Resource } from "./Resource";

export class OrderProduct {
    id: number;
    orderId: number;
    resource: Resource;
    quantity: number;

    constructor(id: number, orderId: number, resource: Resource, quantity: number) {
        this.id = id;
        this.orderId = orderId;
        this.resource = resource;
        this.quantity = quantity;
    }
}
