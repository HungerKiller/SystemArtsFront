import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RoleEnum } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  isAdmin = false;
  isUserConnected = false;

  constructor(private authService: AuthService) {
    this.authService.subject$.subscribe(
      value => {
        this.authService.currentUser().subscribe(user => {
          if (user) {
            this.isAdmin = user.role == RoleEnum.ADMIN
            this.isUserConnected = true;
          }
          else {
            this.isAdmin = false;
            this.isUserConnected = false;
          }
        });
      }
    );
  }

  ngOnInit() {
    this.authService.currentUser().subscribe(user => {
      if (user) {
        this.isAdmin = user.role == RoleEnum.ADMIN
        this.isUserConnected = true;
      }
      else {
        this.isAdmin = false;
        this.isUserConnected = false;
      }
    });
  }
}
