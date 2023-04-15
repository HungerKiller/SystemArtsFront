import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeResourceComponent } from './home-resource.component';

describe('HomeResourceComponent', () => {
  let component: HomeResourceComponent;
  let fixture: ComponentFixture<HomeResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeResourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
