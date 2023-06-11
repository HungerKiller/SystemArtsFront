import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Order, OrderStatusEnum, OrderStatusStrEnum } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { AuthService } from 'src/app/services/auth.service';
import { RoleEnum, User } from 'src/app/models/User';

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
  currentUser: User | undefined;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private messageService: NzMessageService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getOrders(): void {
    this.loading = true;
    this.orderService.getOrders()
      .subscribe({
        next: orders => {
          this.loading = false;
          this.orders = orders.filter(o => !o.isCart);
        }
      });
  }

  getOrdersByUser(userId: number): void {
    this.loading = true;
    this.orderService.getOrdersByUserId(userId)
      .subscribe({
        next: orders => {
          this.loading = false;
          this.orders = orders.filter(o => !o.isCart);
        }
      });
  }

  getOrdersByUserRole() {
    if (this.currentUser) {
      if (this.currentUser!.role == RoleEnum.ADMIN) {
        this.getOrders();
      }
      else {
        this.getOrdersByUser(this.currentUser!.id);
      }
    }
    else {
      this.orders = [];
    }
  }
  
  getCurrentUser(): void {
    this.authService.currentUser().subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.getOrdersByUserRole();
      }
      else {
        this.currentUser = undefined;
      }
    });
  }

  get isAdmin(): boolean {
    return this.currentUser!.role == RoleEnum.ADMIN;
  }

  requestReturnOrder(selectedOrder: Order): void {
    this.updateOrderStatus(selectedOrder, OrderStatusEnum.RETURN_REQUEST, "申请退货成功!");
  }

  validateReceivedOrder(selectedOrder: Order): void {
    this.updateOrderStatus(selectedOrder, OrderStatusEnum.RECEIVED, "确认收货成功!");
  }

  validateShippedOrder(selectedOrder: Order): void {
    this.updateOrderStatus(selectedOrder, OrderStatusEnum.SHIPPED, "确认发货!");
  }

  validateReturnedOrder(selectedOrder: Order): void {
    this.updateOrderStatus(selectedOrder, OrderStatusEnum.RETURNED, "确认退货!");
  }


  updateOrderStatus(selectedOrder: Order, orderStatus: OrderStatusEnum, message: string): void {
    this.orderService.putOrder(selectedOrder.id, { id: selectedOrder.id, user: selectedOrder.user, orderStatus: orderStatus, createdAt: selectedOrder.createdAt, orderProducts: selectedOrder.orderProducts, isCart: selectedOrder.isCart })
      .subscribe({
        next: data => {
          this.messageService.create("success", message);
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
    this.orderDetailComponent.disableStatus = !this.isAdmin;

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
          this.refresh();
        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }

  refresh() {
    this.getOrdersByUserRole();
  }

  getOrderStatusStr(status: OrderStatusEnum): string {
    const enumKeys: string[] = Object.keys(OrderStatusEnum);
    const enumValues: string[] = Object.values(OrderStatusStrEnum);
    let index = enumKeys.indexOf(status);
    return enumValues[index];
  }
}
