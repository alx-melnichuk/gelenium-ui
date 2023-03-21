import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnTooltipComponent } from './gln-tooltip.component';

describe('GlnTooltipComponent', () => {
  let component: GlnTooltipComponent;
  let fixture: ComponentFixture<GlnTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlnTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
