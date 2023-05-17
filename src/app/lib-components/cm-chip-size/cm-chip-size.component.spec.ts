import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmChipSizeComponent } from './cm-chip-size.component';

describe('CmChipSizeComponent', () => {
  let component: CmChipSizeComponent;
  let fixture: ComponentFixture<CmChipSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmChipSizeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmChipSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
