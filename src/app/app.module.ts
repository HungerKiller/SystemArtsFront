import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { ResourceComponent } from './components/resource/resource.component';
import { UserFavoriteComponent } from './components/user-favorite/user-favorite.component';
import { ResourceTypeComponent } from './components/resource-type/resource-type.component';
import { CommentComponent } from './components/comment/comment.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { UserLoginRegisterComponent } from './components/user-login-register/user-login-register.component';
import { AnnouncementDetailComponent } from './components/announcement-detail/announcement-detail.component';
import { ResourceTypeDetailComponent } from './components/resource-type-detail/resource-type-detail.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { ResourceDetailComponent } from './components/resource-detail/resource-detail.component';
import { CommentDetailComponent } from './components/comment-detail/comment-detail.component';
import { UserFavoriteDetailComponent } from './components/user-favorite-detail/user-favorite-detail.component';
import { UserInfoLogoutComponent } from './components/user-info-logout/user-info-logout.component';
import { HomeAnnouncementComponent } from './components/home-announcement/home-announcement.component';
import { HomeResourceComponent } from './components/home-resource/home-resource.component';
import { HomeResourceDetailComponent } from './components/home-resource-detail/home-resource-detail.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ResourceComponent,
    UserFavoriteComponent,
    ResourceTypeComponent,
    CommentComponent,
    AnnouncementComponent,
    UserLoginRegisterComponent,
    AnnouncementDetailComponent,
    ResourceTypeDetailComponent,
    UserDetailComponent,
    ResourceDetailComponent,
    CommentDetailComponent,
    UserFavoriteDetailComponent,
    UserInfoLogoutComponent,
    HomeAnnouncementComponent,
    HomeResourceComponent,
    HomeResourceDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzMessageModule,
    NzTableModule,
    NzDividerModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzTagModule,
    NzDrawerModule,
    NzSwitchModule,
    NzToolTipModule,
    NzPopconfirmModule,
    NzSelectModule,
    NzInputNumberModule,
    NzUploadModule,
    NzAvatarModule,
    NzTypographyModule,
    NzCarouselModule,
    NzAffixModule,
    NzBackTopModule,
    NzImageModule,
    NzDescriptionsModule,
    NzCommentModule,
    NzListModule,
    NzStepsModule,
    NzTimelineModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
