import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFsmComponent } from './create-fsm.component';

describe('CreateFsmComponent', () => {
  let component: CreateFsmComponent;
  let fixture: ComponentFixture<CreateFsmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
