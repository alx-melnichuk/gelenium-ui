import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmTooltipComponent } from './cm-tooltip.component';

describe('CmTooltipComponent', () => {
  let component: CmTooltipComponent;
  let fixture: ComponentFixture<CmTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
