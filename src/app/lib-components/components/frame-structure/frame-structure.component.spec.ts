import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameStructureComponent } from './frame-structure.component';

describe('FrameStructureComponent', () => {
  let component: FrameStructureComponent;
  let fixture: ComponentFixture<FrameStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
