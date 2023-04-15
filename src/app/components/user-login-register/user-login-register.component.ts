import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/services/auth.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { RoleEnum } from 'src/app/models/User';

@Component({
  selector: 'app-user-login-register',
  templateUrl: './user-login-register.component.html',
  styleUrls: ['./user-login-register.component.scss']
})
export class UserLoginRegisterComponent implements OnInit {

  @ViewChild(UserDetailComponent) userDetailComponent!: UserDetailComponent;

  validateForm!: UntypedFormGroup;

  constructor(private authService: AuthService, private messageService: NzMessageService, private fb: UntypedFormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.authService.login(this.validateForm.value)
        .subscribe({
          next: token => {
            localStorage.setItem('token', token)
            this.messageService.create("success", "登录成功!");
            this.authService.subject.next(true);
            this.router.navigate(['/user-info-logout']);
          },
          error: error => {
            this.messageService.create("error", "用户名或密码错误！");
          }
        });

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  registerUser(): void {
    this.userDetailComponent.id = 0;
    this.userDetailComponent.role = RoleEnum.USER;
    this.userDetailComponent.pageTitle = "Register";
    this.userDetailComponent.isVisible = true;
    this.userDetailComponent.disableRole = true;
  }
}
