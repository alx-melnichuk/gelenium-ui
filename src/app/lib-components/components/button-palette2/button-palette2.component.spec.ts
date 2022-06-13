import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPalette2Component } from './button-palette2.component';

describe('ButtonPalette2Component', () => {
  let component: ButtonPalette2Component;
  let fixture: ComponentFixture<ButtonPalette2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonPalette2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonPalette2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
