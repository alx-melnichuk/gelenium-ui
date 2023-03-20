import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmTooltipApiComponent } from './cm-tooltip-api.component';

describe('CmTooltipApiComponent', () => {
  let component: CmTooltipApiComponent;
  let fixture: ComponentFixture<CmTooltipApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmTooltipApiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmTooltipApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
