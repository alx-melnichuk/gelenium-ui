import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlCalendarComponent } from './pl-calendar.component';

describe('PlCalendarComponent', () => {
  let component: PlCalendarComponent;
  let fixture: ComponentFixture<PlCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlCalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
