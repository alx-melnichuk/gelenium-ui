import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameInputComponent } from './frame-input.component';

describe('FrameInputComponent', () => {
  let component: FrameInputComponent;
  let fixture: ComponentFixture<FrameInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
