import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameInputLabelComponent } from './frame-input-label.component';

describe('FrameInputLabelComponent', () => {
  let component: FrameInputLabelComponent;
  let fixture: ComponentFixture<FrameInputLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameInputLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameInputLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
