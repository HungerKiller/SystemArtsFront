import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeResourceViewDetailComponent } from './home-resource-view-detail.component';

describe('ResourceDetailComponent', () => {
  let component: HomeResourceViewDetailComponent;
  let fixture: ComponentFixture<HomeResourceViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeResourceViewDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeResourceViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
