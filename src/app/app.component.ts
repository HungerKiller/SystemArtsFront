import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RoleEnum } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  isAdmin = false;

  constructor(private authService: AuthService) {
    this.authService.subject$.subscribe(
      value => {
        this.authService.currentUser().subscribe(user => {
          if (user) {
            this.isAdmin = user.role == RoleEnum.ADMIN
          }
          else {
            this.isAdmin = false;
          }
        });
      }
    );
   }
}
