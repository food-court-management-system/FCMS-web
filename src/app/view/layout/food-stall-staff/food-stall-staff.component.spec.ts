import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodStallStaffComponent } from './food-stall-staff.component';

describe('FoodStallStaffComponent', () => {
  let component: FoodStallStaffComponent;
  let fixture: ComponentFixture<FoodStallStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodStallStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodStallStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
