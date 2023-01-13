import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmAutocompleteAsynchronyComponent } from './cm-autocomplete-asynchrony.component';

describe('CmAutocompleteAsynchronyComponent', () => {
  let component: CmAutocompleteAsynchronyComponent;
  let fixture: ComponentFixture<CmAutocompleteAsynchronyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmAutocompleteAsynchronyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmAutocompleteAsynchronyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
