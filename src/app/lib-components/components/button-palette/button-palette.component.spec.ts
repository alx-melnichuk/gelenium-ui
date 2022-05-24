import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPaletteComponent } from './button-palette.component';

describe('ButtonPaletteComponent', () => {
  let component: ButtonPaletteComponent;
  let fixture: ComponentFixture<ButtonPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonPaletteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
