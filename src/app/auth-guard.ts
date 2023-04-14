import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.authService.currentUser().subscribe(user => {
            if (user) {
                if (route.data['roles'] && !route.data['roles'].includes(user.role)) {
                    // 用户没有访问权限，重定向到主页
                    this.router.navigate(['/user-login-register']);
                    return false;
                }

                // 用户具有访问权限，返回 true
                return true;
            }

            // 用户未登录，重定向到登录页面
            this.router.navigate(['/user-login-register'], { queryParams: { returnUrl: state.url } });
            return false;
        });
    }
}
