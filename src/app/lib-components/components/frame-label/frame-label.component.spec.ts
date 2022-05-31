import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameLabelComponent } from './frame-label.component';

describe('FrameLabelComponent', () => {
  let component: FrameLabelComponent;
  let fixture: ComponentFixture<FrameLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
