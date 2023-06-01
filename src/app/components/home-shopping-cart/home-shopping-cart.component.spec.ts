import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeShoppingCartComponent } from './home-shopping-cart.component';

describe('HomeShoppingCartComponent', () => {
  let component: HomeShoppingCartComponent;
  let fixture: ComponentFixture<HomeShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeShoppingCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
