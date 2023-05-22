import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeResourceViewComponent } from './home-resource-view.component';

describe('ResourceComponent', () => {
  let component: HomeResourceViewComponent;
  let fixture: ComponentFixture<HomeResourceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeResourceViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeResourceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
