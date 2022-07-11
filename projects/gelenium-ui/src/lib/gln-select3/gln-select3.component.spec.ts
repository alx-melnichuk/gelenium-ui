import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnSelect3Component } from './gln-select3.component';

describe('GlnSelect3Component', () => {
  let component: GlnSelect3Component;
  let fixture: ComponentFixture<GlnSelect3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnSelect3Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnSelect3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
