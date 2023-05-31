import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Order, OrderStatusEnum } from 'src/app/models/Order';
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

  editOrder(selectedOrder: Order): void {
    this.orderDetailComponent.id = selectedOrder.id;
    this.orderDetailComponent.user = selectedOrder.user;
    this.orderDetailComponent.createdAt = selectedOrder.createdAt;
    this.orderDetailComponent.orderProducts = selectedOrder.orderProducts;
    this.orderDetailComponent.orderStatus = selectedOrder.orderStatus;
    this.orderDetailComponent.pageTitle = "Update";
    this.orderDetailComponent.pageTitleChinese = "编辑";
    this.orderDetailComponent.isVisible = true;
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
    const enumValues: string[] = Object.values(OrderStatusEnum);
    let index = enumKeys.indexOf(status);
    return enumValues[index];
  }
}
