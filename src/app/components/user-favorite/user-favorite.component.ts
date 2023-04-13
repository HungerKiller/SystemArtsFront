import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserFavoriteDetailComponent } from '../user-favorite-detail/user-favorite-detail.component';
import { UserFavorite } from 'src/app/models/UserFavorite';
import { UserFavoriteService } from 'src/app/services/user-favorite.service';

@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrls: ['./user-favorite.component.scss']
})
export class UserFavoriteComponent implements OnInit {

  @ViewChild(UserFavoriteDetailComponent) userFavoriteDetailComponent!: UserFavoriteDetailComponent;
  userFavorites!: UserFavorite[];
  loading = true;

  constructor(private userFavoriteService: UserFavoriteService, private messageService: NzMessageService) { }

  ngOnInit() {
    this.getUserFavorites();
  }

  getUserFavorites(): void {
    this.loading = true;
    this.userFavoriteService.getUserFavorites()
      .subscribe({
        next: userFavorites => {
          this.loading = false;
          this.userFavorites = userFavorites;
        }
      });
  }

  editUserFavorite(selectedUserFavorite: UserFavorite): void {
    this.userFavoriteDetailComponent.id = selectedUserFavorite.id;
    this.userFavoriteDetailComponent.resource = selectedUserFavorite.resource;
    this.userFavoriteDetailComponent.user = selectedUserFavorite.user;
    this.userFavoriteDetailComponent.resourceId = selectedUserFavorite.resource.id;
    this.userFavoriteDetailComponent.userId = selectedUserFavorite.user.id;
    this.userFavoriteDetailComponent.pageTitle = "Update";
    this.userFavoriteDetailComponent.isVisible = true;
  }

  createUserFavorite(): void {
    this.userFavoriteDetailComponent.id = 0;
    this.userFavoriteDetailComponent.pageTitle = "Create";
    this.userFavoriteDetailComponent.isVisible = true;
  }

  deleteUserFavorite(userFavoriteId: number): void {
    this.userFavoriteService.deleteUserFavorite(userFavoriteId)
      .subscribe({
        next: data => {
          this.messageService.create("success", "Delete succeed!");
          this.getUserFavorites();
        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }

  refresh() {
    this.getUserFavorites();
  }
}
