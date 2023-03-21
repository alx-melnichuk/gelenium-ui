import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmTooltipFeatureComponent } from './cm-tooltip-feature.component';

describe('CmTooltipFeatureComponent', () => {
  let component: CmTooltipFeatureComponent;
  let fixture: ComponentFixture<CmTooltipFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmTooltipFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmTooltipFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
