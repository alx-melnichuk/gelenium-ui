import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmCalendarComponent } from './cm-calendar.component';

describe('CmCalendarComponent', () => {
  let component: CmCalendarComponent;
  let fixture: ComponentFixture<CmCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmCalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
