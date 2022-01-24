import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameInputConfigComponent } from './frame-input-config.component';

describe('FrameInputConfigComponent', () => {
  let component: FrameInputConfigComponent;
  let fixture: ComponentFixture<FrameInputConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrameInputConfigComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameInputConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
