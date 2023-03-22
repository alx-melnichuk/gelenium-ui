import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmChipComponent } from './cm-chip.component';

describe('CmChipComponent', () => {
  let component: CmChipComponent;
  let fixture: ComponentFixture<CmChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
