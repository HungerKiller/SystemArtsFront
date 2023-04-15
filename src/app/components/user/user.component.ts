import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserService } from 'src/app/services/user.service';
import { RoleEnum, User } from 'src/app/models/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild(UserDetailComponent) userDetailComponent!: UserDetailComponent;
  users!: User[];
  loading = true;

  constructor(private userService: UserService, private messageService: NzMessageService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.loading = true;
    this.userService.getUsers()
    .subscribe({
      next: users => { 
        this.loading = false; 
        this.users = users; 
      }});
  }

  editUser(selectedUser : User): void {
    this.userDetailComponent.id = selectedUser.id;
    this.userDetailComponent.username = selectedUser.username;
    this.userDetailComponent.password = selectedUser.password;
    this.userDetailComponent.email = selectedUser.email;
    this.userDetailComponent.age = selectedUser.age;
    this.userDetailComponent.role = selectedUser.role;
    this.userDetailComponent.pageTitle = "Update";
    this.userDetailComponent.isVisible = true;
    this.userDetailComponent.disableRole = false;
  }

  createUser(): void {
    this.userDetailComponent.id = 0;
    this.userDetailComponent.role = RoleEnum.USER;
    this.userDetailComponent.pageTitle = "Create";
    this.userDetailComponent.isVisible = true;
    this.userDetailComponent.disableRole = false;
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId)
      .subscribe({
        next: data => {
          this.messageService.create("success", "Delete succeed!");
          this.getUsers();
        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }

  refresh() {
    this.getUsers();
  }
}
