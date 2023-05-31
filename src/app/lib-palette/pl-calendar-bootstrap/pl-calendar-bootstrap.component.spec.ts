import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlCalendarBootstrapComponent } from './pl-calendar-bootstrap.component';

describe('PlCalendarBootstrapComponent', () => {
  let component: PlCalendarBootstrapComponent;
  let fixture: ComponentFixture<PlCalendarBootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlCalendarBootstrapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlCalendarBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
