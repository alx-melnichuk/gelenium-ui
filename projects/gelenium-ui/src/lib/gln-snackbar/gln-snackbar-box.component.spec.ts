import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnSnackbarBoxComponent } from './gln-snackbar-box.component';

describe('GlnSnackbarBoxComponent', () => {
  let component: GlnSnackbarBoxComponent;
  let fixture: ComponentFixture<GlnSnackbarBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnSnackbarBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlnSnackbarBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
