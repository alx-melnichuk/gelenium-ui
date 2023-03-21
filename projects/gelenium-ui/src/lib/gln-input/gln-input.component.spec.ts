import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnFrameComponent } from './../gln-frame/gln-frame.component';
import { GlnHintOrErrorComponent } from './../gln-hint-or-error/gln-hint-or-error.component';

import { GlnInputComponent } from './gln-input.component';

describe('GlnInputComponent', () => {
  let component: GlnInputComponent;
  let fixture: ComponentFixture<GlnInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnInputComponent, GlnFrameComponent, GlnHintOrErrorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
