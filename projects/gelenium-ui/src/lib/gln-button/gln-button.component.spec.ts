import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlnFrameExteriorButtonDirective } from './../directives/gln-frame-exterior-button/gln-frame-exterior-button.directive';
import { GlnFrameSizeDirective } from './../directives/gln-frame-size/gln-frame-size.directive';
import { GlnTouchRippleComponent } from './../gln-touch-ripple/gln-touch-ripple.component';

import { GlnButtonComponent } from './gln-button.component';

describe('GlnButtonComponent', () => {
  let component: GlnButtonComponent;
  let fixture: ComponentFixture<GlnButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnButtonComponent, GlnFrameExteriorButtonDirective, GlnFrameSizeDirective, GlnTouchRippleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
