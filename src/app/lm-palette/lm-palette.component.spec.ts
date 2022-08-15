import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmPaletteComponent } from './lm-palette.component';

describe('LmPaletteComponent', () => {
  let component: LmPaletteComponent;
  let fixture: ComponentFixture<LmPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LmPaletteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LmPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
