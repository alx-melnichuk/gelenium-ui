import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnSelect2Component } from './gln-select2.component';

describe('GlnSelect2Component', () => {
  let component: GlnSelect2Component;
  let fixture: ComponentFixture<GlnSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnSelect2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
