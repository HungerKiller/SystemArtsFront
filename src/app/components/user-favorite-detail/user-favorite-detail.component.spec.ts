import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavoriteDetailComponent } from './user-favorite-detail.component';

describe('UserFavoriteDetailComponent', () => {
  let component: UserFavoriteDetailComponent;
  let fixture: ComponentFixture<UserFavoriteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFavoriteDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFavoriteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
