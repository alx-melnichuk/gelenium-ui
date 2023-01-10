import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmAutocompleteApiComponent } from './cm-autocomplete-api.component';

describe('CmAutocompleteApiComponent', () => {
  let component: CmAutocompleteApiComponent;
  let fixture: ComponentFixture<CmAutocompleteApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmAutocompleteApiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmAutocompleteApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
