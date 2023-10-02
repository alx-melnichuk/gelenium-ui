import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmDatepickerFeatureComponent } from './cm-datepicker-feature.component';

describe('CmDatepickerFeatureComponent', () => {
  let component: CmDatepickerFeatureComponent;
  let fixture: ComponentFixture<CmDatepickerFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmDatepickerFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmDatepickerFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
