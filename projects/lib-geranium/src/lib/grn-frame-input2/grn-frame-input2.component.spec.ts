import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnFrameInput2Component } from './grn-frame-input2.component';

describe('GrnFrameInput2Component', () => {
  let component: GrnFrameInput2Component;
  let fixture: ComponentFixture<GrnFrameInput2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrnFrameInput2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnFrameInput2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
