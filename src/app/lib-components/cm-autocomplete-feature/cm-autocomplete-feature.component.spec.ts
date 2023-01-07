import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmAutocompleteFeatureComponent } from './cm-autocomplete-feature.component';

describe('CmAutocompleteFeatureComponent', () => {
  let component: CmAutocompleteFeatureComponent;
  let fixture: ComponentFixture<CmAutocompleteFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmAutocompleteFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmAutocompleteFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
