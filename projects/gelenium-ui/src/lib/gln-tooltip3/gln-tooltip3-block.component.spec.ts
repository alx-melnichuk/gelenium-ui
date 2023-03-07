import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnTooltip3BlockComponent } from './gln-tooltip3-block.component';

describe('GlnTooltip3BlockComponent', () => {
  let component: GlnTooltip3BlockComponent;
  let fixture: ComponentFixture<GlnTooltip3BlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlnTooltip3BlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlnTooltip3BlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
