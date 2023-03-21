import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmTooltipCustomizationComponent } from './cm-tooltip-customization.component';

describe('CmTooltipCustomizationComponent', () => {
  let component: CmTooltipCustomizationComponent;
  let fixture: ComponentFixture<CmTooltipCustomizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmTooltipCustomizationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmTooltipCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
