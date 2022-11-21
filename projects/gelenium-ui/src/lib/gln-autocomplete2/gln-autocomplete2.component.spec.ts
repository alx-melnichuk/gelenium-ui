import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnAutocomplete2Component } from './gln-autocomplete2.component';

describe('GlnAutocomplete2Component', () => {
  let component: GlnAutocomplete2Component;
  let fixture: ComponentFixture<GlnAutocomplete2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlnAutocomplete2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlnAutocomplete2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
