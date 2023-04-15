import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info-logout',
  templateUrl: './user-info-logout.component.html',
  styleUrls: ['./user-info-logout.component.scss']
})
export class UserInfoLogoutComponent implements OnInit {

  @ViewChild(UserDetailComponent) userDetailComponent!: UserDetailComponent
  user: User | undefined;

  constructor(private authService: AuthService, private router: Router) {
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
        this.user = user;
      }
      else {
        this.user = undefined;
      }
    });
  }

  update(): void {
    if (this.user) {
      this.userDetailComponent.id = this.user.id;
      this.userDetailComponent.username = this.user.username;
      this.userDetailComponent.password = this.user.password;
      this.userDetailComponent.email = this.user.email;
      this.userDetailComponent.age = this.user.age;
      this.userDetailComponent.role = this.user.role;
      this.userDetailComponent.pageTitle = "Update";
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
}
