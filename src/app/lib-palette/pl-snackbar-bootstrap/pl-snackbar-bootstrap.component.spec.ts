import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlSnackbarBootstrapComponent } from './pl-snackbar-bootstrap.component';

describe('PlSnackbarBootstrapComponent', () => {
  let component: PlSnackbarBootstrapComponent;
  let fixture: ComponentFixture<PlSnackbarBootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlSnackbarBootstrapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlSnackbarBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
