import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Order, OrderStatusEnum } from 'src/app/models/Order';
import { OrderProduct } from 'src/app/models/OrderProduct';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-shopping-cart',
  templateUrl: './home-shopping-cart.component.html',
  styleUrls: ['./home-shopping-cart.component.scss']
})
export class HomeShoppingCartComponent implements OnInit {
  order!: Order;
  orderProducts!: OrderProduct[];
  loading = true;
  currentUser: User | undefined;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private authService: AuthService,
    private messageService: NzMessageService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCartByUser(userId: number): void {
    this.loading = true;
    this.orderService.getCartOrderByUserId(userId)
      .subscribe({
        next: order => {
          this.loading = false;
          this.order = order;
          this.orderProducts = order.orderProducts;
          // Calculate total price and quantity
          this.totalPrice = 0;
          this.totalQuantity = 0;
          for (let product of order.orderProducts) {
            this.totalPrice = this.totalPrice + product.resource.price * product.quantity;
            this.totalQuantity = this.totalQuantity + product.quantity;
          }
        }
      });
  }

  getCurrentUser(): void {
    this.authService.currentUser().subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.getCartByUser(this.currentUser.id);
      }
      else {
        this.currentUser = undefined;
      }
    });
  }

  deleteProduct(productId: number): void {
    this.orderProducts = this.orderProducts.filter(p => p.id != productId);
  }

  submit() {
    if (!this.order.orderProducts || this.order.orderProducts.length == 0) {
      this.messageService.create("error", "购物车为空，请向购物车添加资源!");
      return;
    }

    this.order.orderProducts = this.orderProducts;
    this.orderService.putOrder(this.order.id, this.order).subscribe({
      next: data => {
        this.messageService.create("success", "更新购物车成功!");
        this.getCurrentUser();
      },
      error: error => {
        this.messageService.create("error", error.error);
      }
    });
  }

  pay() {
    if (!this.order.orderProducts || this.order.orderProducts.length == 0) {
      this.messageService.create("error", "购物车为空，请向购物车添加资源!");
      return;
    }

    if (this.currentUser?.money! < this.totalPrice) {
      this.messageService.create("error", "付款失败，余额不足，请充值!");
      return;
    }

    var totalMoney = this.currentUser?.money! - this.totalPrice;
    totalMoney = Math.round((totalMoney + Number.EPSILON) * 100) / 100;
    this.userService.putUser(this.currentUser?.id!, { id: this.currentUser?.id!, username: this.currentUser?.username!, password: this.currentUser?.password!, email: this.currentUser?.email!, age: this.currentUser?.age, money: totalMoney, role: this.currentUser?.role! })
      .subscribe({
        next: data => {
          this.order.orderStatus = OrderStatusEnum.PAID;
          this.order.isCart = false;
          this.orderService.putOrder(this.order.id, this.order).subscribe({
            next: data => {
              this.messageService.create("success", "付款成功!");
              this.getCurrentUser();
            },
            error: error => {
              this.messageService.create("error", error.error);
            }
          });

        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }
}
