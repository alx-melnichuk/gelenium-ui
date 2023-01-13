import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmAutocompleteComponent } from './cm-autocomplete.component';

describe('CmAutocompleteComponent', () => {
  let component: CmAutocompleteComponent;
  let fixture: ComponentFixture<CmAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmAutocompleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
