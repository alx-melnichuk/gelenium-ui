import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPalette3Component } from './button-palette3.component';

describe('ButtonPalette3Component', () => {
  let component: ButtonPalette3Component;
  let fixture: ComponentFixture<ButtonPalette3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonPalette3Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonPalette3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
