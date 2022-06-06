import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnFrameExteriorInputDirective } from './../directives/gln-frame-exterior-input/gln-frame-exterior-input.directive';
import { GlnFrameComponent } from './../gln-frame/gln-frame.component';
import { GlnFrameOrnamentDirective } from './../directives/gln-frame-ornament/gln-frame-ornament.directive';
import { GlnFrameSizeDirective } from './../directives/gln-frame-size/gln-frame-size.directive';
import { GlnHintOrErrorComponent } from './../gln-hint-or-error/gln-hint-or-error.component';

import { GlnInputComponent } from './gln-input.component';

describe('GlnInputComponent', () => {
  let component: GlnInputComponent;
  let fixture: ComponentFixture<GlnInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GlnInputComponent,
        GlnFrameExteriorInputDirective,
        GlnFrameComponent,
        GlnFrameOrnamentDirective,
        GlnFrameSizeDirective,
        GlnHintOrErrorComponent,
      ],
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
