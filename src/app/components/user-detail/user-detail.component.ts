import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Role2LabelMapping, RoleEnum } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  id!: number;
  username!: string;
  password!: string;
  email!: string;
  age?: number;
  money?: number;
  role!: RoleEnum;

  roles = Object.values(RoleEnum);

  pageTitle!: string;
  pageTitleChinese!: string;
  isVisible!: boolean;
  disableRole!: boolean;

  @Output() isNeedRefresh = new EventEmitter<boolean>();

  constructor(private userService: UserService, private authService: AuthService, private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  close(): void {
    this.isVisible = false;
  }

  submit(): void {
    if (!(this.username && this.password && this.email && this.role)) {
      this.messageService.create("error", "Username, password, email, role could not be empty!");
      return;
    }
    if (this.pageTitle == "Update") {
      this.userService.putUser(this.id, { id: this.id, username: this.username, password: this.password, email: this.email, age: this.age, money: this.money, role: this.role })
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
      this.userService.postUser({ id: 0, username: this.username, password: this.password, email: this.email, age: this.age, money: this.money, role: this.role })
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
    else if (this.pageTitle == "Register") {
      this.authService.register({ id: 0, username: this.username, password: this.password, email: this.email, age: this.age, money: this.money, role: this.role })
        .subscribe({
          next: data => {
            this.messageService.create("success", "注册成功!");
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
