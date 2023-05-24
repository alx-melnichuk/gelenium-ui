import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmDatepickerBasicComponent } from './cm-datepicker-basic.component';

describe('CmDatepickerBasicComponent', () => {
  let component: CmDatepickerBasicComponent;
  let fixture: ComponentFixture<CmDatepickerBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmDatepickerBasicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmDatepickerBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
