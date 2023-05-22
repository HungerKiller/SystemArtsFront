import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeResourceEditDetailComponent } from './home-resource-edit-detail.component';

describe('HomeResourceDetailComponent', () => {
  let component: HomeResourceEditDetailComponent;
  let fixture: ComponentFixture<HomeResourceEditDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeResourceEditDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeResourceEditDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
