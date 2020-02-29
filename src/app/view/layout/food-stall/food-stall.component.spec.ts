import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodStallComponent } from './food-stall.component';

describe('FoodStallComponent', () => {
  let component: FoodStallComponent;
  let fixture: ComponentFixture<FoodStallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodStallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodStallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
