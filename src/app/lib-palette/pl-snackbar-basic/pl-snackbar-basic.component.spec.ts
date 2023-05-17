import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlSnackbarBasicComponent } from './pl-snackbar-basic.component';

describe('PlSnackbarBasicComponent', () => {
  let component: PlSnackbarBasicComponent;
  let fixture: ComponentFixture<PlSnackbarBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlSnackbarBasicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlSnackbarBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
