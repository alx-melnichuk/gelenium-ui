import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameBasicComponent } from './frame-basic.component';

describe('FrameBasicComponent', () => {
  let component: FrameBasicComponent;
  let fixture: ComponentFixture<FrameBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
