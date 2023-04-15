import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { ResourceComponent } from './components/resource/resource.component';
import { UserLoginRegisterComponent } from './components/user-login-register/user-login-register.component';
import { UserComponent } from './components/user/user.component';
import { ResourceTypeComponent } from './components/resource-type/resource-type.component';
import { UserFavoriteComponent } from './components/user-favorite/user-favorite.component';
import { CommentComponent } from './components/comment/comment.component';
import { AuthGuard } from './auth-guard';
import { RoleEnum } from './models/User';
import { UserInfoLogoutComponent } from './components/user-info-logout/user-info-logout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/user-login-register' },
  { path: 'user-info-logout', component: UserInfoLogoutComponent },
  { path: 'user-login-register', component: UserLoginRegisterComponent },
  { path: 'announcement', component: AnnouncementComponent, canActivate: [AuthGuard], data: { roles: [RoleEnum.ADMIN] } },
  { path: 'resource-type', component: ResourceTypeComponent, canActivate: [AuthGuard], data: { roles: [RoleEnum.ADMIN] } },
  { path: 'resource', component: ResourceComponent, canActivate: [AuthGuard], data: { roles: [RoleEnum.ADMIN] } },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: [RoleEnum.ADMIN] } },
  { path: 'user-favorite', component: UserFavoriteComponent, canActivate: [AuthGuard], data: { roles: [RoleEnum.ADMIN] } },
  { path: 'comment', component: CommentComponent, canActivate: [AuthGuard], data: { roles: [RoleEnum.ADMIN] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
