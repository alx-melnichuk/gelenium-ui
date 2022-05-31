import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameSizeComponent } from './frame-size.component';

describe('FrameSizeComponent', () => {
  let component: FrameSizeComponent;
  let fixture: ComponentFixture<FrameSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
