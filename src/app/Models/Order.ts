import { OrderProduct } from "./OrderProduct";
import { User } from "./User";

export class Order {
    id: number;
    user: User;
    orderStatus: OrderStatusEnum;
    createdAt!: Date;
    orderProducts: OrderProduct[];
    isCart!: boolean;

    constructor(id: number, user: User, orderStatus: OrderStatusEnum, orderProducts: OrderProduct[]) {
        this.id = id;
        this.orderStatus = orderStatus;
        this.user = user;
        this.orderProducts = orderProducts;
    }
}

export enum OrderStatusEnum {
    PAID = "PAID",
    SHIPPED = "SHIPPED",
    RETURN_REQUEST = "RETURN_REQUEST",
    RETURNED = "RETURNED",
    RECEIVED = "RECEIVED",
    COMPLETED  = "COMPLETED"
}

export enum OrderStatusStrEnum {
    PAID = "已付款",
    SHIPPED = "已发货",
    RETURN_REQUEST = "申请退货中",
    RETURNED = "已退货",
    RECEIVED = "已收货",
    COMPLETED = "已完成"
}