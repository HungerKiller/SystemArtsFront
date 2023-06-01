import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Order, OrderStatusEnum } from 'src/app/models/Order';
import { OrderProduct } from 'src/app/models/OrderProduct';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

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

  constructor(
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
          // Calculate total price
          this.totalPrice = 0;
          for (let product of order.orderProducts) {
            this.totalPrice = this.totalPrice + product.resource.price * product.quantity;
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

  }

  submit() {
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
    this.order.orderStatus = OrderStatusEnum.PAYED;
    this.orderService.putOrder(this.order.id, this.order).subscribe({
      next: data => {
        this.messageService.create("success", "付款成功!");
        this.getCurrentUser();
      },
      error: error => {
        this.messageService.create("error", error.error);
      }
    });
  }
}
