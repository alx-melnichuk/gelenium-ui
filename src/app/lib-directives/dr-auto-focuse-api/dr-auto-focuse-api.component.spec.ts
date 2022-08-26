import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrAutoFocuseApiComponent } from './dr-auto-focuse-api.component';

describe('DrAutoFocuseApiComponent', () => {
  let component: DrAutoFocuseApiComponent;
  let fixture: ComponentFixture<DrAutoFocuseApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrAutoFocuseApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrAutoFocuseApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
