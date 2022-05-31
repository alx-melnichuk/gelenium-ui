import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FramePaletteComponent } from './frame-palette.component';

describe('FramePaletteComponent', () => {
  let component: FramePaletteComponent;
  let fixture: ComponentFixture<FramePaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FramePaletteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FramePaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
