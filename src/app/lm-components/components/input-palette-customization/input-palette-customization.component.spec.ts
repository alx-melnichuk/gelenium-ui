import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPaletteCustomizationComponent } from './input-palette-customization.component';

describe('InputPaletteCustomizationComponent', () => {
  let component: InputPaletteCustomizationComponent;
  let fixture: ComponentFixture<InputPaletteCustomizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputPaletteCustomizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPaletteCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
