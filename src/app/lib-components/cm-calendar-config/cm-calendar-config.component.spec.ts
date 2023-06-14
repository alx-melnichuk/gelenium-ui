import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmCalendarConfigComponent } from './cm-calendar-config.component';

describe('CmCalendarConfigComponent', () => {
  let component: CmCalendarConfigComponent;
  let fixture: ComponentFixture<CmCalendarConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmCalendarConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmCalendarConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
