import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPaletteComponent } from './input-palette.component';

describe('InputPaletteComponent', () => {
  let component: InputPaletteComponent;
  let fixture: ComponentFixture<InputPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputPaletteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
