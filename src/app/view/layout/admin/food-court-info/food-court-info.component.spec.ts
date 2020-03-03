import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCourtInfoComponent } from './food-court-info.component';

describe('FoodCourtInfoComponent', () => {
  let component: FoodCourtInfoComponent;
  let fixture: ComponentFixture<FoodCourtInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodCourtInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCourtInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
