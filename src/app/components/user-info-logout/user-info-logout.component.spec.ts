import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoLogoutComponent } from './user-info-logout.component';

describe('UserInfoLogoutComponent', () => {
  let component: UserInfoLogoutComponent;
  let fixture: ComponentFixture<UserInfoLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoLogoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfoLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
