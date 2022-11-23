import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnAutocompleteComponent } from './gln-autocomplete.component';

describe('GlnAutocompleteComponent', () => {
  let component: GlnAutocompleteComponent;
  let fixture: ComponentFixture<GlnAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlnAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlnAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
