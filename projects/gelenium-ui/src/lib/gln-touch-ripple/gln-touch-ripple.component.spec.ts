import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnTouchRippleComponent } from './gln-touch-ripple.component';

describe('GlnTouchRippleComponent', () => {
  let component: GlnTouchRippleComponent;
  let fixture: ComponentFixture<GlnTouchRippleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlnTouchRippleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnTouchRippleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
