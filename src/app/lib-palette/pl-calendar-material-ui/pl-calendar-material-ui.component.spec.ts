import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlCalendarMaterialUiComponent } from './pl-calendar-material-ui.component';

describe('PlCalendarMaterialUiComponent', () => {
  let component: PlCalendarMaterialUiComponent;
  let fixture: ComponentFixture<PlCalendarMaterialUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlCalendarMaterialUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlCalendarMaterialUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
