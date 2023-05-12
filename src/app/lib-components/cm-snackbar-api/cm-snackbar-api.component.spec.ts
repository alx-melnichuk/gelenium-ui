import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSnackbarApiComponent } from './cm-snackbar-api.component';

describe('CmSnackbarApiComponent', () => {
  let component: CmSnackbarApiComponent;
  let fixture: ComponentFixture<CmSnackbarApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSnackbarApiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSnackbarApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
