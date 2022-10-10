import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnFrameComponent } from './../gln-frame/gln-frame.component';
import { GlnFrameOrnamentDirective } from './../directives/gln-frame-ornament/gln-frame-ornament.directive';
import { GlnHintOrErrorComponent } from './../gln-hint-or-error/gln-hint-or-error.component';

import { GlnInputComponent } from './gln-input.component';

describe('GlnInputComponent', () => {
  let component: GlnInputComponent;
  let fixture: ComponentFixture<GlnInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnInputComponent, GlnFrameComponent, GlnFrameOrnamentDirective, GlnHintOrErrorComponent],
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
