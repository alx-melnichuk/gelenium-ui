import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSnackbarComponent } from './cm-snackbar.component';

describe('CmSnackbarComponent', () => {
  let component: CmSnackbarComponent;
  let fixture: ComponentFixture<CmSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSnackbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
