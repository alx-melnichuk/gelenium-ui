import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmRadioBasicComponent } from './cm-radio-basic.component';

describe('CmRadioBasicComponent', () => {
  let component: CmRadioBasicComponent;
  let fixture: ComponentFixture<CmRadioBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmRadioBasicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmRadioBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
