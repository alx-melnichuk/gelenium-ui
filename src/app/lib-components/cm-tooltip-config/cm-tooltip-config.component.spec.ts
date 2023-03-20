import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmTooltipConfigComponent } from './cm-tooltip-config.component';

describe('CmTooltipConfigComponent', () => {
  let component: CmTooltipConfigComponent;
  let fixture: ComponentFixture<CmTooltipConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmTooltipConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmTooltipConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
