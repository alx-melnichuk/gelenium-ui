import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameConfigComponent } from './frame-config.component';

describe('FrameConfigComponent', () => {
  let component: FrameConfigComponent;
  let fixture: ComponentFixture<FrameConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
