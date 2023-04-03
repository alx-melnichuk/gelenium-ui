import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmRadioComponent } from './cm-radio.component';

describe('CmRadioComponent', () => {
  let component: CmRadioComponent;
  let fixture: ComponentFixture<CmRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmRadioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
