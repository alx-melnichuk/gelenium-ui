import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmAutocompleteConfigComponent } from './cm-autocomplete-config.component';

describe('CmAutocompleteConfigComponent', () => {
  let component: CmAutocompleteConfigComponent;
  let fixture: ComponentFixture<CmAutocompleteConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmAutocompleteConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmAutocompleteConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
