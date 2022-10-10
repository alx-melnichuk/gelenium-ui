import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnFrameComponent } from './../gln-frame/gln-frame.component';
import { GlnFrameOrnamentDirective } from './../directives/gln-frame-ornament/gln-frame-ornament.directive';
import { GlnHintOrErrorComponent } from './../gln-hint-or-error/gln-hint-or-error.component';

import { GlnSelectComponent } from './gln-select.component';

describe('GlnSelectComponent', () => {
  let component: GlnSelectComponent;
  let fixture: ComponentFixture<GlnSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnSelectComponent, GlnFrameComponent, GlnFrameOrnamentDirective, GlnHintOrErrorComponent],
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
