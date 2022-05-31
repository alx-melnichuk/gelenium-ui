import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameApiComponent } from './frame-api.component';

describe('FrameApiComponent', () => {
  let component: FrameApiComponent;
  let fixture: ComponentFixture<FrameApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
