import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTypeDetailComponent } from './resource-type-detail.component';

describe('ResourceTypeDetailComponent', () => {
  let component: ResourceTypeDetailComponent;
  let fixture: ComponentFixture<ResourceTypeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceTypeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
