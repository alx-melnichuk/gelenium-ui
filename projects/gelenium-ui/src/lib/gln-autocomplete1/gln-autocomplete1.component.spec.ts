import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnAutocomplete1Component } from './gln-autocomplete1.component';

describe('GlnAutocompleteComponent', () => {
  let component: GlnAutocomplete1Component;
  let fixture: ComponentFixture<GlnAutocomplete1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnAutocomplete1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(GlnAutocomplete1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
