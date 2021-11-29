import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameInputApiComponent } from './frame-input-api.component';

describe('FrameInputApiComponent', () => {
  let component: FrameInputApiComponent;
  let fixture: ComponentFixture<FrameInputApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameInputApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameInputApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
