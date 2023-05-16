import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSnackbarCustomizationComponent } from './cm-snackbar-customization.component';

describe('CmSnackbarCustomizationComponent', () => {
  let component: CmSnackbarCustomizationComponent;
  let fixture: ComponentFixture<CmSnackbarCustomizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSnackbarCustomizationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSnackbarCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
