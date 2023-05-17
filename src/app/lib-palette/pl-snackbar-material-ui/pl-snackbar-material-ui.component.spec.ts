import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlSnackbarMaterialUiComponent } from './pl-snackbar-material-ui.component';

describe('PlSnackbarMaterialUiComponent', () => {
  let component: PlSnackbarMaterialUiComponent;
  let fixture: ComponentFixture<PlSnackbarMaterialUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlSnackbarMaterialUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlSnackbarMaterialUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
