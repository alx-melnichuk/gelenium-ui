import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnDatepickerComponent } from './gln-datepicker.component';

describe('GlnDatepickerComponent', () => {
  let component: GlnDatepickerComponent;
  let fixture: ComponentFixture<GlnDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnDatepickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlnDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
