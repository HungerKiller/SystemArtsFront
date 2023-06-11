import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info-logout',
  templateUrl: './user-info-logout.component.html',
  styleUrls: ['./user-info-logout.component.scss']
})
export class UserInfoLogoutComponent implements OnInit {

  @ViewChild(UserDetailComponent) userDetailComponent!: UserDetailComponent
  currentUser: User | undefined;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private messageService: NzMessageService) {
    this.authService.subject$.subscribe(
      value => {
        this.getCurrentUser();
      }
    );
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.authService.currentUser().subscribe(user => {
      if (user) {
        this.currentUser = user;
      }
      else {
        this.currentUser = undefined;
      }
    });
  }

  update(): void {
    if (this.currentUser) {
      this.userDetailComponent.id = this.currentUser.id;
      this.userDetailComponent.username = this.currentUser.username;
      this.userDetailComponent.password = this.currentUser.password;
      this.userDetailComponent.email = this.currentUser.email;
      this.userDetailComponent.age = this.currentUser.age;
      this.userDetailComponent.role = this.currentUser.role;
      this.userDetailComponent.pageTitle = "Update";
      this.userDetailComponent.pageTitleChinese = "编辑";
      this.userDetailComponent.isVisible = true;
      this.userDetailComponent.disableRole = true;
    }
  }

  logout(): void {
    localStorage.setItem('token', '');
    this.router.navigate(['/user-login-register']).then(
      () => location.reload()
    );
  }

  refresh() {
    this.getCurrentUser();
  }



  rechargeMoney = 0;
  isRechargeVisible = false;
  radioValue = 'A';

  showRechargeModal(): void {
    this.isRechargeVisible = true;
  }

  handleOk(): void {
    var totalMoney = this.currentUser?.money! + this.rechargeMoney;
    this.userService.putUser(this.currentUser?.id!, { id: this.currentUser?.id!, username: this.currentUser?.username!, password: this.currentUser?.password!, email: this.currentUser?.email!, age: this.currentUser?.age, money: totalMoney, role: this.currentUser?.role! })
        .subscribe({
          next: data => {
            this.messageService.create("success", "充值成功!");
            this.refresh();
          },
          error: error => {
            this.messageService.create("error", error.error);
          }
        });
    this.isRechargeVisible = false;
  }

  handleCancel(): void {
    this.messageService.create("success", "取消充值!");
    this.isRechargeVisible = false;
  }
}
