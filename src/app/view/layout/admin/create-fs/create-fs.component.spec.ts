import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFsComponent } from './create-fs.component';

describe('CreateFsComponent', () => {
  let component: CreateFsComponent;
  let fixture: ComponentFixture<CreateFsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
