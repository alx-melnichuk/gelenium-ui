import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameInputPaletteComponent } from './frame-input-palette.component';

describe('FrameInputPaletteComponent', () => {
  let component: FrameInputPaletteComponent;
  let fixture: ComponentFixture<FrameInputPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameInputPaletteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameInputPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
