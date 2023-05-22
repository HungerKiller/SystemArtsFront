import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Resource } from 'src/app/models/Resource';
import { User } from 'src/app/models/User';
import { UserFavorite } from 'src/app/models/UserFavorite';
import { ResourceService } from 'src/app/services/resource.service';
import { UserFavoriteService } from 'src/app/services/user-favorite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-favorite-detail',
  templateUrl: './user-favorite-detail.component.html',
  styleUrls: ['./user-favorite-detail.component.scss']
})
export class UserFavoriteDetailComponent implements OnInit {

  id!: number;
  resource!: Resource;
  user!: User;

  userId!: number;
  resourceId!: number;

  resources!: Resource[];
  users!: User[];

  pageTitle!: string;
  isVisible!: boolean;

  @Output() isNeedRefresh = new EventEmitter<boolean>();

  constructor(
    private resourceService: ResourceService,
    private userService: UserService,
    private userFavoriteService: UserFavoriteService,
    private messageService: NzMessageService) {
    this.getUsers();
    this.getResources();
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

  getResources(): void {
    this.resourceService.getResources()
      .subscribe({
        next: resources => {
          this.resources = resources;
          this.resource = resources[0];
          this.resourceId = resources[0].id;
        }
      });
  }

  close(): void {
    this.isVisible = false;
  }

  submit(): void {
    if (this.pageTitle == "Create") {
      this.userFavoriteService.postUserFavorite(new UserFavorite(0, this.user, this.resource))
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
}
