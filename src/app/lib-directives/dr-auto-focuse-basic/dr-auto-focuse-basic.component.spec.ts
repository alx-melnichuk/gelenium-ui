import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrAutoFocuseBasicComponent } from './dr-auto-focuse-basic.component';

describe('DrAutoFocuseBasicComponent', () => {
  let component: DrAutoFocuseBasicComponent;
  let fixture: ComponentFixture<DrAutoFocuseBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrAutoFocuseBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrAutoFocuseBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
