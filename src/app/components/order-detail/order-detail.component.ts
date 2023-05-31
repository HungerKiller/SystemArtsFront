import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { OrderStatusEnum, OrderStatusStrEnum } from 'src/app/models/Order';
import { OrderProduct } from 'src/app/models/OrderProduct';
import { User } from 'src/app/models/User';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  id!: number;
  user!: User;
  createdAt!: Date;
  orderStatus!: OrderStatusEnum;
  orderProducts!: OrderProduct[];
  orderStatuses = Object.keys(OrderStatusEnum);

  pageTitle!: string;
  pageTitleChinese!: string;
  isVisible!: boolean;
  disableRole!: boolean;

  @Output() isNeedRefresh = new EventEmitter<boolean>();

  constructor(
    private orderService: OrderService,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.isVisible = false;
  }

  submit(): void {
    if (this.pageTitle == "Update") {
      this.orderService.putOrder(this.id, { id: this.id, user: this.user, orderStatus: this.orderStatus, createdAt: this.createdAt, orderProducts: this.orderProducts })
        .subscribe({
          next: data => {
            this.messageService.create("success", "更新成功!");
            this.close();
            this.isNeedRefresh.emit();
          },
          error: error => {
            this.messageService.create("error", error.error);
          }
        });
    }
    else if (this.pageTitle == "Create") {
      this.orderService.postOrder({ id: 0, user: this.user, orderStatus: this.orderStatus, createdAt: this.createdAt, orderProducts: this.orderProducts })
        .subscribe({
          next: data => {
            this.messageService.create("success", "创建成功!");
            this.close();
            this.isNeedRefresh.emit();
          },
          error: error => {
            this.messageService.create("error", error.error);
          }
        });
    }
  }

  getOrderStatusStr(statusKey: string): string {
    const enumKeys: string[] = Object.keys(OrderStatusEnum);
    const enumValues: string[] = Object.values(OrderStatusStrEnum);
    let index = enumKeys.indexOf(statusKey);
    return enumValues[index];
  }
}