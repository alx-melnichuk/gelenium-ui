import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnSnackbar2AlertComponent } from './gln-snackbar2-alert.component';

describe('GlnSnackbar2AlertComponent', () => {
  let component: GlnSnackbar2AlertComponent;
  let fixture: ComponentFixture<GlnSnackbar2AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnSnackbar2AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlnSnackbar2AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
