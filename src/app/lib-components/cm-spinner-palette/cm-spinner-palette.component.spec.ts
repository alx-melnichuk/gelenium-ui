import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSpinnerPaletteComponent } from './cm-spinner-palette.component';

describe('CmSpinnerPaletteComponent', () => {
  let component: CmSpinnerPaletteComponent;
  let fixture: ComponentFixture<CmSpinnerPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSpinnerPaletteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSpinnerPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
