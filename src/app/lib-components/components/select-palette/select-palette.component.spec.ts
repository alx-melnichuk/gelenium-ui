import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPaletteComponent } from './select-palette.component';

describe('SelectPaletteComponent', () => {
  let component: SelectPaletteComponent;
  let fixture: ComponentFixture<SelectPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectPaletteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
