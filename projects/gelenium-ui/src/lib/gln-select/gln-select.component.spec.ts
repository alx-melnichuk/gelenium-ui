import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnOrnamentRightDirective } from '../directives/gln-ornament/gln-ornament-right.directive';
import { GlnOptionsScrollDirective } from '../gln-option/gln-options-scroll.directive';
import { GlnFrameComponent } from './../gln-frame/gln-frame.component';
import { GlnHintOrErrorComponent } from './../gln-hint-or-error/gln-hint-or-error.component';

import { GlnSelectComponent } from './gln-select.component';

describe('GlnSelectComponent', () => {
  let component: GlnSelectComponent;
  let fixture: ComponentFixture<GlnSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GlnSelectComponent,
        GlnFrameComponent,
        GlnHintOrErrorComponent,
        GlnOrnamentRightDirective,
        GlnOptionsScrollDirective,
        CdkOverlayOrigin,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
