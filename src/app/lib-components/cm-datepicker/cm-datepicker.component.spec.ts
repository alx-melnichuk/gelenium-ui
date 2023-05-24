import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmDatepickerComponent } from './cm-datepicker.component';

describe('CmDatepickerComponent', () => {
  let component: CmDatepickerComponent;
  let fixture: ComponentFixture<CmDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmDatepickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
