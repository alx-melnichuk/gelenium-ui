import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnFrameOrnamentDirective } from '../directives/gln-frame-ornament/gln-frame-ornament.directive';
import { GlnFrameExteriorInputDirective } from './../directives/gln-frame-exterior-input/gln-frame-exterior-input.directive';
import { GlnFrameComponent } from './../gln-frame/gln-frame.component';
import { GlnFrameSizeDirective } from './../directives/gln-frame-size/gln-frame-size.directive';
import { GlnHintOrErrorComponent } from './../gln-hint-or-error/gln-hint-or-error.component';

import { GlnTextareaComponent } from './gln-textarea.component';

describe('GlnTextareaComponent', () => {
  let component: GlnTextareaComponent;
  let fixture: ComponentFixture<GlnTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GlnTextareaComponent,
        GlnFrameExteriorInputDirective,
        GlnFrameComponent,
        GlnFrameOrnamentDirective,
        GlnFrameSizeDirective,
        GlnHintOrErrorComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
