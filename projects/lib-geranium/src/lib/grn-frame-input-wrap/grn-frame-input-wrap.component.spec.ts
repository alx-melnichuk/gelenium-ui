import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnFrameInputWrapComponent } from './grn-frame-input-wrap.component';

describe('GrnFrameInputWrapComponent', () => {
  let component: GrnFrameInputWrapComponent;
  let fixture: ComponentFixture<GrnFrameInputWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrnFrameInputWrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnFrameInputWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
