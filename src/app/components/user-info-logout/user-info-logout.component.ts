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
  currentUser: User | undefined;

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
