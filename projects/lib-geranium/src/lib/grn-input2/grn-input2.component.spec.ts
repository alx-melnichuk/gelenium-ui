import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnInput2Component } from './grn-input2.component';

describe('GrnInput2Component', () => {
  let component: GrnInput2Component;
  let fixture: ComponentFixture<GrnInput2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrnInput2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnInput2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
