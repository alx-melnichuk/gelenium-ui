import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmRadioConfigComponent } from './cm-radio-config.component';

describe('CmRadioConfigComponent', () => {
  let component: CmRadioConfigComponent;
  let fixture: ComponentFixture<CmRadioConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmRadioConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmRadioConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
