import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Comment } from 'src/app/models/Comment';
import { OrderProduct } from 'src/app/models/OrderProduct';
import { Resource } from 'src/app/models/Resource';
import { ResourceFile } from 'src/app/models/ResourceFile';
import { ResourceType } from 'src/app/models/ResourceType';
import { User } from 'src/app/models/User';
import { UserFavorite } from 'src/app/models/UserFavorite';
import { CommentService } from 'src/app/services/comment.service';
import { OrderService } from 'src/app/services/order.service';
import { ResourceTypeService } from 'src/app/services/resource-type.service';
import { ResourceService } from 'src/app/services/resource.service';
import { UserFavoriteService } from 'src/app/services/user-favorite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-resource-view-detail',
  templateUrl: './home-resource-view-detail.component.html',
  styleUrls: ['./home-resource-view-detail.component.scss']
})
export class HomeResourceViewDetailComponent implements OnInit {

  resource: Resource | undefined;
  title!: string;
  description!: string;
  price!: number;
  clickCount!: number;
  resourceType: ResourceType | undefined;
  user: User | undefined;
  createdAt!: Date;
  updatedAt!: Date;
  comments!: Comment[];
  resourceFiles!: ResourceFile[];
  currentUser: User | undefined;

  userId!: number;
  resourceTypeId!: number;

  resourceTypes!: ResourceType[];
  users!: User[];

  pageTitle!: string;
  isVisible!: boolean;

  // comments
  submitting = false;
  inputValue = '';

  // isFavorite
  userFavorite: UserFavorite | undefined;

  @Output() isNeedRefresh = new EventEmitter<boolean>();

  constructor(
    private resourceService: ResourceService,
    private resourceTypeService: ResourceTypeService,
    private userFavoriteService: UserFavoriteService,
    private userService: UserService,
    private commentService: CommentService,
    private orderService: OrderService,
    private messageService: NzMessageService) {
    this.getUsers();
    this.getResourceTypes();
  }

  ngOnInit(): void {
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe({
        next: users => {
          this.users = users;
          this.user = users[0];
          this.userId = users[0].id;
        }
      });
  }

  getResourceTypes(): void {
    this.resourceTypeService.getResourceTypes()
      .subscribe({
        next: resourceTypes => {
          this.resourceTypes = resourceTypes;
          this.resourceType = resourceTypes[0];
          this.resourceTypeId = resourceTypes[0].id;
        }
      });
  }

  close(): void {
    this.isVisible = false;
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    this.commentService.postComment(new Comment(0, content, this.user!, this.resource!.id))
      .subscribe({
        next: data => {
          this.messageService.create("success", "评论成功!");
          this.close();
          this.isNeedRefresh.emit();
        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }

  changeFavorite(): void {
    if (this.userFavorite) {
      this.userFavoriteService.deleteUserFavorite(this.userFavorite.id).subscribe({
        next: data => {
          this.userFavorite = undefined;
        }
      })
    }
    else {
      this.userFavoriteService.postUserFavorite(new UserFavorite(this.currentUser!, this.resource!)).subscribe({
        next: data => {
          this.userFavorite = data;
        }
      })
    }
  }

  addToCart(): void {
    if (!this.currentUser) {
      this.messageService.create("error", "用户未登录，不能使用购物车!");
      return;
    }

    this.orderService.getCartOrderByUserId(this.currentUser?.id!)
      .subscribe({
        next: order => {
          if (!order.orderProducts) {
            order.orderProducts = [];
          }
          // Add to cart
          let added = false;
          for (let product of order.orderProducts) {
            if (product.resource.id == this.resource?.id) {
              product.quantity++;
              added = true;
            }
          }

          if (!added) {
            order.orderProducts.push(new OrderProduct(0, order.id, this.resource!, 1));
          }

          // Update cart
          this.orderService.putOrder(order.id, order).subscribe({
            next: data => {
              this.messageService.create("success", "成功添加至购物车!");
            },
            error: error => {
              this.messageService.create("error", error.error);
            }
          });
        }
      });
  }
}
