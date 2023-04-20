import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnSnackbar2ContainerComponent } from './gln-snackbar2-container.component';

describe('GlnSnackbar2ContainerComponent', () => {
  let component: GlnSnackbar2ContainerComponent;
  let fixture: ComponentFixture<GlnSnackbar2ContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnSnackbar2ContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlnSnackbar2ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
