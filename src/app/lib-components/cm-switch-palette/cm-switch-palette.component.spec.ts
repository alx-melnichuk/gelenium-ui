import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSwitchPaletteComponent } from './cm-switch-palette.component';

describe('CmSwitchPaletteComponent', () => {
  let component: CmSwitchPaletteComponent;
  let fixture: ComponentFixture<CmSwitchPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSwitchPaletteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSwitchPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
