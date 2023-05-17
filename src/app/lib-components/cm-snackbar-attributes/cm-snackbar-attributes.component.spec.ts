import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSnackbarAttributesComponent } from './cm-snackbar-attributes.component';

describe('CmSnackbarAttributesComponent', () => {
  let component: CmSnackbarAttributesComponent;
  let fixture: ComponentFixture<CmSnackbarAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSnackbarAttributesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSnackbarAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
