import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnSpinnerComponent } from './gln-spinner.component';

describe('GlnSpinnerComponent', () => {
  let component: GlnSpinnerComponent;
  let fixture: ComponentFixture<GlnSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlnSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
