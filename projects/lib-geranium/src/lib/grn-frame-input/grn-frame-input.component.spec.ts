import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnFrameInputComponent } from './grn-frame-input.component';

describe('GrnFrameInputComponent', () => {
  let component: GrnFrameInputComponent;
  let fixture: ComponentFixture<GrnFrameInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrnFrameInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnFrameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
