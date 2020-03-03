import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFsmComponent } from './manage-fsm.component';

describe('ManageFsmComponent', () => {
  let component: ManageFsmComponent;
  let fixture: ComponentFixture<ManageFsmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
