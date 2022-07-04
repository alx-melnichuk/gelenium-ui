import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameFeatureComponent } from './frame-feature.component';

describe('FrameFeatureComponent', () => {
  let component: FrameFeatureComponent;
  let fixture: ComponentFixture<FrameFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrameFeatureComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
