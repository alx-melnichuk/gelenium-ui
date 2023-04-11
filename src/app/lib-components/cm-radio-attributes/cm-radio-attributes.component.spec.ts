import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmRadioAttributesComponent } from './cm-radio-attributes.component';

describe('CmRadioAttributesComponent', () => {
  let component: CmRadioAttributesComponent;
  let fixture: ComponentFixture<CmRadioAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmRadioAttributesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmRadioAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
