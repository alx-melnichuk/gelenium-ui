import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnSnackbarComponent } from './gln-snackbar.component';

describe('GlnSnackbarComponent', () => {
  let component: GlnSnackbarComponent;
  let fixture: ComponentFixture<GlnSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnSnackbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlnSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
