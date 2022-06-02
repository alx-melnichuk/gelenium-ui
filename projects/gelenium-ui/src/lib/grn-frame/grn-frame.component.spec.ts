import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnFrameComponent } from './grn-frame.component';

describe('GrnFrameComponent', () => {
  let component: GrnFrameComponent;
  let fixture: ComponentFixture<GrnFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrnFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
