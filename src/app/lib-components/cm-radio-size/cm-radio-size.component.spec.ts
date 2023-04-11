import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmRadioSizeComponent } from './cm-radio-size.component';

describe('CmRadioSizeComponent', () => {
  let component: CmRadioSizeComponent;
  let fixture: ComponentFixture<CmRadioSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmRadioSizeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmRadioSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
