import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameAttributesComponent } from './frame-attributes.component';

describe('FrameAttributesComponent', () => {
  let component: FrameAttributesComponent;
  let fixture: ComponentFixture<FrameAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrameAttributesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
