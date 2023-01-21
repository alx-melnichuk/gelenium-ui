import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlnFrameOrnamentDirective } from '../directives/gln-frame-ornament/gln-frame-ornament.directive';
import { GlnTouchRippleComponent } from './../gln-touch-ripple/gln-touch-ripple.component';

import { GlnButtonComponent } from './gln-button.component';

describe('GlnButtonComponent', () => {
  let component: GlnButtonComponent;
  let fixture: ComponentFixture<GlnButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnButtonComponent, GlnFrameOrnamentDirective, GlnTouchRippleComponent],
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
