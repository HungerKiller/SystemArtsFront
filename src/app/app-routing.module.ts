import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { ResourceComponent } from './components/resource/resource.component';
import { UserLoginRegisterComponent } from './components/user-login-register/user-login-register.component';
import { UserComponent } from './components/user/user.component';
import { ResourceTypeComponent } from './components/resource-type/resource-type.component';
import { UserFavoriteComponent } from './components/user-favorite/user-favorite.component';
import { CommentComponent } from './components/comment/comment.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/announcement' },
  { path: 'announcement', component: AnnouncementComponent },
  { path: 'resource', component: ResourceComponent },
  { path: 'user-login-register', component: UserLoginRegisterComponent },
  { path: 'user', component: UserComponent },
  { path: 'resource-type', component: ResourceTypeComponent },
  { path: 'user-favorite', component: UserFavoriteComponent },
  { path: 'comment', component: CommentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
