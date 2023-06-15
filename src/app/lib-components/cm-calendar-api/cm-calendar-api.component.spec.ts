import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmCalendarApiComponent } from './cm-calendar-api.component';

describe('CmCalendarApiComponent', () => {
  let component: CmCalendarApiComponent;
  let fixture: ComponentFixture<CmCalendarApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmCalendarApiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmCalendarApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
