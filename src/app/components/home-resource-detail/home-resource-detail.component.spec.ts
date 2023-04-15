import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeResourceDetailComponent } from './home-resource-detail.component';

describe('HomeResourceDetailComponent', () => {
  let component: HomeResourceDetailComponent;
  let fixture: ComponentFixture<HomeResourceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeResourceDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeResourceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
