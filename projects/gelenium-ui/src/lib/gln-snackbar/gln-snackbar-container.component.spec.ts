import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnSnackbarContainerComponent } from './gln-snackbar-container.component';

describe('GlnSnackbarContainerComponent', () => {
  let component: GlnSnackbarContainerComponent;
  let fixture: ComponentFixture<GlnSnackbarContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnSnackbarContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlnSnackbarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
