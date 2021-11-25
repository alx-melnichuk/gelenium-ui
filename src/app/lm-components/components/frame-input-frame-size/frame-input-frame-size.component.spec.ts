import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameInputFrameSizeComponent } from './frame-input-frame-size.component';

describe('FrameInputFrameSizeComponent', () => {
  let component: FrameInputFrameSizeComponent;
  let fixture: ComponentFixture<FrameInputFrameSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameInputFrameSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameInputFrameSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
