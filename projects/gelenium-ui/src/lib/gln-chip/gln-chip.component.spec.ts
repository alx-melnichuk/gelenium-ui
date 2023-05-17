import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnChipComponent } from './gln-chip.component';

describe('GlnChipComponent', () => {
  let component: GlnChipComponent;
  let fixture: ComponentFixture<GlnChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlnChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
