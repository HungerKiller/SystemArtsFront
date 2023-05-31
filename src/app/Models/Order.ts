import { OrderProduct } from "./OrderProduct";
import { User } from "./User";

export class Order {
    id: number;
    user: User;
    orderStatus: OrderStatusEnum;
    createdAt!: Date;
    orderProducts: OrderProduct[];

    constructor(id: number, user: User, orderStatus: OrderStatusEnum, orderProducts: OrderProduct[]) {
        this.id = id;
        this.orderStatus = orderStatus;
        this.user = user;
        this.orderProducts = orderProducts;
    }
}

export enum OrderStatusEnum {
    ACTIVE = '未付款',
    PAYED = '已付款',
    CONFIRMED = '管理员已确认',
    DELIVERED = '已发货',
    COMPLETED = '已完成'
}

export const OrderStatus2LabelMapping: Record<OrderStatusEnum, string> = {
    [OrderStatusEnum.ACTIVE]: '未付款',
    [OrderStatusEnum.PAYED]: '已付款',
    [OrderStatusEnum.CONFIRMED]: '管理员已确认',
    [OrderStatusEnum.DELIVERED]: '已发货',
    [OrderStatusEnum.COMPLETED]: '已完成'
};