import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnSnackbarTextComponent } from './gln-snackbar-text.component';

describe('GlnSnackbarTextComponent', () => {
  let component: GlnSnackbarTextComponent;
  let fixture: ComponentFixture<GlnSnackbarTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnSnackbarTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlnSnackbarTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
