import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FramePalette2Component } from './frame-palette2.component';

describe('FramePalette2Component', () => {
  let component: FramePalette2Component;
  let fixture: ComponentFixture<FramePalette2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FramePalette2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FramePalette2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
