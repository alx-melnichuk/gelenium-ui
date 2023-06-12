import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmCalendarAttributesComponent } from './cm-calendar-attributes.component';

describe('CmCalendarAttributesComponent', () => {
  let component: CmCalendarAttributesComponent;
  let fixture: ComponentFixture<CmCalendarAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmCalendarAttributesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmCalendarAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
