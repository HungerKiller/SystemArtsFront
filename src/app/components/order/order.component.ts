import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Order, OrderStatusEnum, OrderStatusStrEnum } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @ViewChild(OrderDetailComponent) orderDetailComponent!: OrderDetailComponent;
  orders!: Order[];
  orderStatus!: OrderStatusEnum;
  loading = true;

  constructor(private orderService: OrderService, private messageService: NzMessageService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.loading = true;
    this.orderService.getOrders()
      .subscribe({
        next: orders => {
          this.loading = false;
          this.orders = orders;
        }
      });
  }
  
  validateOrder(selectedOrder: Order): void {
    this.orderStatus = OrderStatusEnum.CONFIRMED
    this.orderService.putOrder(selectedOrder.id, { id: selectedOrder.id, user: selectedOrder.user, orderStatus: this.orderStatus, createdAt: selectedOrder.createdAt, orderProducts: selectedOrder.orderProducts, isCart: selectedOrder.isCart })
      .subscribe({
        next: data => {
          this.messageService.create("success", "审核通过成功!");
          this.refresh();
        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }

  editOrder(selectedOrder: Order): void {
    this.orderDetailComponent.id = selectedOrder.id;
    this.orderDetailComponent.user = selectedOrder.user;
    this.orderDetailComponent.username = selectedOrder.user.username;
    this.orderDetailComponent.createdAt = selectedOrder.createdAt;
    this.orderDetailComponent.orderProducts = selectedOrder.orderProducts;
    this.orderDetailComponent.orderStatus = selectedOrder.orderStatus;
    this.orderDetailComponent.isCart = selectedOrder.isCart;
    this.orderDetailComponent.pageTitle = "Update";
    this.orderDetailComponent.pageTitleChinese = "编辑";
    this.orderDetailComponent.isVisible = true;

    // Calculate total price
    let totalPrice = 0;
    for (let product of selectedOrder.orderProducts) {
      totalPrice = totalPrice + product.resource.price * product.quantity;
    }
    this.orderDetailComponent.totalPrice = totalPrice;
  }

  deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId)
      .subscribe({
        next: data => {
          this.messageService.create("success", "删除成功!");
          this.getOrders();
        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }

  refresh() {
    this.getOrders();
  }

  getOrderStatusStr(status: OrderStatusEnum): string {
    const enumKeys: string[] = Object.keys(OrderStatusEnum);
    const enumValues: string[] = Object.values(OrderStatusStrEnum);
    let index = enumKeys.indexOf(status);
    return enumValues[index];
  }
}
