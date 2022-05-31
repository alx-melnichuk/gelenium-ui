import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameBorderRadiusComponent } from './frame-border-radius.component';

describe('FrameBorderRadiusComponent', () => {
  let component: FrameBorderRadiusComponent;
  let fixture: ComponentFixture<FrameBorderRadiusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameBorderRadiusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameBorderRadiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
