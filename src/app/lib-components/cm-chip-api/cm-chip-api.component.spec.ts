import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmChipApiComponent } from './cm-chip-api.component';

describe('CmChipApiComponent', () => {
  let component: CmChipApiComponent;
  let fixture: ComponentFixture<CmChipApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmChipApiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmChipApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
