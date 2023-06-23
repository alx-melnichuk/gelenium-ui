import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlCalendarMatComponent } from './pl-calendar-mat.component';

describe('PlCalendarMatComponent', () => {
  let component: PlCalendarMatComponent;
  let fixture: ComponentFixture<PlCalendarMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlCalendarMatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlCalendarMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
