import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameInputBasicComponent } from './frame-input-basic.component';

describe('FrameInputBasicComponent', () => {
  let component: FrameInputBasicComponent;
  let fixture: ComponentFixture<FrameInputBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameInputBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameInputBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
