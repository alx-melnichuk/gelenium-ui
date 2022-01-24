import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameInputHelperTextComponent } from './frame-input-helper-text.component';

describe('FrameInputHelperTextComponent', () => {
  let component: FrameInputHelperTextComponent;
  let fixture: ComponentFixture<FrameInputHelperTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrameInputHelperTextComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameInputHelperTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
