import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSnackbarBasicComponent } from './cm-snackbar-basic.component';

describe('CmSnackbarBasicComponent', () => {
  let component: CmSnackbarBasicComponent;
  let fixture: ComponentFixture<CmSnackbarBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSnackbarBasicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSnackbarBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
