import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmRadioApiComponent } from './cm-radio-api.component';

describe('CmRadioApiComponent', () => {
  let component: CmRadioApiComponent;
  let fixture: ComponentFixture<CmRadioApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmRadioApiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmRadioApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
