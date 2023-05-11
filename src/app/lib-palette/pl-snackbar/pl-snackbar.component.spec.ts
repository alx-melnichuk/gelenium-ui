import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlSnackbarComponent } from './pl-snackbar.component';

describe('PlSnackbarComponent', () => {
  let component: PlSnackbarComponent;
  let fixture: ComponentFixture<PlSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlSnackbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
