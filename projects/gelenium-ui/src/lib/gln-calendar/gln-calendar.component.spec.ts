import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnCalendarComponent } from './gln-calendar.component';

describe('GlnCalendarComponent', () => {
  let component: GlnCalendarComponent;
  let fixture: ComponentFixture<GlnCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnCalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlnCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
