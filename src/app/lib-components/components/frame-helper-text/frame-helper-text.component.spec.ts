import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameHelperTextComponent } from './frame-helper-text.component';

describe('FrameHelperTextComponent', () => {
  let component: FrameHelperTextComponent;
  let fixture: ComponentFixture<FrameHelperTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameHelperTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameHelperTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
