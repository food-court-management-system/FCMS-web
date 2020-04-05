import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFoodStallComponent } from './edit-food-stall.component';

describe('EditFoodStallComponent', () => {
  let component: EditFoodStallComponent;
  let fixture: ComponentFixture<EditFoodStallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFoodStallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFoodStallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
