import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeResourceEditComponent } from './home-resource-edit.component';

describe('HomeResourceComponent', () => {
  let component: HomeResourceEditComponent;
  let fixture: ComponentFixture<HomeResourceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeResourceEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeResourceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
