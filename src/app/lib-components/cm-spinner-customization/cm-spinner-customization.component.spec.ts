import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSpinnerCustomizationComponent } from './cm-spinner-customization.component';

describe('CmSpinnerCustomizationComponent', () => {
  let component: CmSpinnerCustomizationComponent;
  let fixture: ComponentFixture<CmSpinnerCustomizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSpinnerCustomizationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSpinnerCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
