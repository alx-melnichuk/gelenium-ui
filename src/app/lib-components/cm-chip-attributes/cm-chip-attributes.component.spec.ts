import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmChipAttributesComponent } from './cm-chip-attributes.component';

describe('CmChipAttributesComponent', () => {
  let component: CmChipAttributesComponent;
  let fixture: ComponentFixture<CmChipAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmChipAttributesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmChipAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
