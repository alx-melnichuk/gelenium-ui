import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameInputBorderRadiusComponent } from './frame-input-border-radius.component';

describe('FrameInputBorderRadiusComponent', () => {
  let component: FrameInputBorderRadiusComponent;
  let fixture: ComponentFixture<FrameInputBorderRadiusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameInputBorderRadiusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameInputBorderRadiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
