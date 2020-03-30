import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFsComponent } from './manage-fs.component';

describe('ManageFsComponent', () => {
  let component: ManageFsComponent;
  let fixture: ComponentFixture<ManageFsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
