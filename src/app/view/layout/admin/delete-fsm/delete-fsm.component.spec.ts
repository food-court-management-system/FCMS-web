import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFsmComponent } from './delete-fsm.component';

describe('DeleteFsmComponent', () => {
  let component: DeleteFsmComponent;
  let fixture: ComponentFixture<DeleteFsmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
