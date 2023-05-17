import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnRadioButtonComponent } from './gln-radio-button.component';

describe('GlnRadioButtonComponent', () => {
  let component: GlnRadioButtonComponent;
  let fixture: ComponentFixture<GlnRadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnRadioButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlnRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
