import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { HomeResourceViewComponent } from './components/home-resource-view/home-resource-view.component';
import { UserLoginRegisterComponent } from './components/user-login-register/user-login-register.component';
import { UserComponent } from './components/user/user.component';
import { ResourceTypeComponent } from './components/resource-type/resource-type.component';
import { UserFavoriteComponent } from './components/user-favorite/user-favorite.component';
import { CommentComponent } from './components/comment/comment.component';
import { AuthGuard } from './auth-guard';
import { RoleEnum } from './models/User';
import { UserInfoLogoutComponent } from './components/user-info-logout/user-info-logout.component';
import { HomeAnnouncementComponent } from './components/home-announcement/home-announcement.component';
import { HomeResourceEditComponent } from './components/home-resource-edit/home-resource-edit.component';
import { DataVisualizationComponent } from './components/data-visualization/data-visualization.component';
import { OrderComponent } from './components/order/order.component';
import { HomeShoppingCartComponent } from './components/home-shopping-cart/home-shopping-cart.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home-announcement' },
  { path: 'home-announcement', component: HomeAnnouncementComponent },
  { path: 'home-resource-view', component: HomeResourceViewComponent },
  { path: 'home-resource-edit', component: HomeResourceEditComponent },
  { path: 'user-info-logout', component: UserInfoLogoutComponent },
  { path: 'user-login-register', component: UserLoginRegisterComponent },
  { path: 'shopping-cart', component: HomeShoppingCartComponent },
  { path: 'order', component: OrderComponent },
  { path: 'announcement', component: AnnouncementComponent, canActivate: [AuthGuard], data: { roles: [RoleEnum.ADMIN] } },
  { path: 'resource-type', component: ResourceTypeComponent, canActivate: [AuthGuard], data: { roles: [RoleEnum.ADMIN] } },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: [RoleEnum.ADMIN] } },
  { path: 'user-favorite', component: UserFavoriteComponent, canActivate: [AuthGuard], data: { roles: [RoleEnum.ADMIN] } },
  { path: 'comment', component: CommentComponent, canActivate: [AuthGuard], data: { roles: [RoleEnum.ADMIN] } },
  { path: 'data-visualization', component: DataVisualizationComponent, canActivate: [AuthGuard], data: { roles: [RoleEnum.ADMIN] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
