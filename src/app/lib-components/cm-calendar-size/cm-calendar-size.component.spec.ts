import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmCalendarSizeComponent } from './cm-calendar-size.component';

describe('CmCalendarSizeComponent', () => {
  let component: CmCalendarSizeComponent;
  let fixture: ComponentFixture<CmCalendarSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmCalendarSizeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmCalendarSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
