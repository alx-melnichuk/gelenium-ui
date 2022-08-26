import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrAutoFocuseComponent } from './dr-auto-focuse.component';

describe('DrAutoFocuseComponent', () => {
  let component: DrAutoFocuseComponent;
  let fixture: ComponentFixture<DrAutoFocuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrAutoFocuseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrAutoFocuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
