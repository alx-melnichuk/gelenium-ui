import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlFrameComponent } from './pl-frame.component';

describe('PlFrameComponent', () => {
  let component: PlFrameComponent;
  let fixture: ComponentFixture<PlFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlFrameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
