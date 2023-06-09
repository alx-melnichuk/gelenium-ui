import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmCalendarBasicComponent } from './cm-calendar-basic.component';

describe('CmCalendarBasicComponent', () => {
  let component: CmCalendarBasicComponent;
  let fixture: ComponentFixture<CmCalendarBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmCalendarBasicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmCalendarBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
