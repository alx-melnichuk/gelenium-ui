import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmAutocompleteAttributesComponent } from './cm-autocomplete-attributes.component';

describe('CmAutocompleteAttributesComponent', () => {
  let component: CmAutocompleteAttributesComponent;
  let fixture: ComponentFixture<CmAutocompleteAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmAutocompleteAttributesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmAutocompleteAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
