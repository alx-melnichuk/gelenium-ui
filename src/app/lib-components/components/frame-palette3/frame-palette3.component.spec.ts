import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FramePalette3Component } from './frame-palette3.component';

describe('FramePalette3Component', () => {
  let component: FramePalette3Component;
  let fixture: ComponentFixture<FramePalette3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FramePalette3Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FramePalette3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
