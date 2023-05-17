import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmChipConfigComponent } from './cm-chip-config.component';

describe('CmChipConfigComponent', () => {
  let component: CmChipConfigComponent;
  let fixture: ComponentFixture<CmChipConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmChipConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmChipConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
