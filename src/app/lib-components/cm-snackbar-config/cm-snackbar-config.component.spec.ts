import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSnackbarConfigComponent } from './cm-snackbar-config.component';

describe('CmSnackbarConfigComponent', () => {
  let component: CmSnackbarConfigComponent;
  let fixture: ComponentFixture<CmSnackbarConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSnackbarConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSnackbarConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
