import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmTooltipBasicComponent } from './cm-tooltip-basic.component';

describe('CmTooltipBasicComponent', () => {
  let component: CmTooltipBasicComponent;
  let fixture: ComponentFixture<CmTooltipBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmTooltipBasicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmTooltipBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
