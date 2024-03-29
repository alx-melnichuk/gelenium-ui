import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnFrameComponent } from './../gln-frame/gln-frame.component';
import { GlnHintOrErrorComponent } from './../gln-hint-or-error/gln-hint-or-error.component';

import { GlnTextareaComponent } from './gln-textarea.component';

describe('GlnTextareaComponent', () => {
  let component: GlnTextareaComponent;
  let fixture: ComponentFixture<GlnTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnTextareaComponent, GlnFrameComponent, GlnHintOrErrorComponent],
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
