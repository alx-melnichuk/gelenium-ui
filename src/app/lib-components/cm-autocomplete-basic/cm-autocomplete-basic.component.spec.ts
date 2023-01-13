import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmAutocompleteBasicComponent } from './cm-autocomplete-basic.component';

describe('CmAutocompleteBasicComponent', () => {
  let component: CmAutocompleteBasicComponent;
  let fixture: ComponentFixture<CmAutocompleteBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmAutocompleteBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmAutocompleteBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
