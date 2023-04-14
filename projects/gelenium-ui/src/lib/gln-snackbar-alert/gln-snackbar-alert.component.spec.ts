import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnSnackbarAlertComponent } from './gln-snackbar-alert.component';

describe('GlnSnackbarAlertComponent', () => {
  let component: GlnSnackbarAlertComponent;
  let fixture: ComponentFixture<GlnSnackbarAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnSnackbarAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlnSnackbarAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
