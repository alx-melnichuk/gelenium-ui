import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlCalendarBasicComponent } from './pl-calendar-basic.component';

describe('PlCalendarBasicComponent', () => {
  let component: PlCalendarBasicComponent;
  let fixture: ComponentFixture<PlCalendarBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlCalendarBasicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlCalendarBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
