import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmTooltipAttributesComponent } from './cm-tooltip-attributes.component';

describe('CmTooltipAttributesComponent', () => {
  let component: CmTooltipAttributesComponent;
  let fixture: ComponentFixture<CmTooltipAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmTooltipAttributesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmTooltipAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
