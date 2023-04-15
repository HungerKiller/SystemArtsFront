import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAnnouncementComponent } from './home-announcement.component';

describe('HomeAnnouncementComponent', () => {
  let component: HomeAnnouncementComponent;
  let fixture: ComponentFixture<HomeAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAnnouncementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
