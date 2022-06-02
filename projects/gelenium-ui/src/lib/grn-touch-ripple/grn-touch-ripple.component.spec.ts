import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnTouchRippleComponent } from './grn-touch-ripple.component';

describe('GrnTouchRippleComponent', () => {
  let component: GrnTouchRippleComponent;
  let fixture: ComponentFixture<GrnTouchRippleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrnTouchRippleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnTouchRippleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
