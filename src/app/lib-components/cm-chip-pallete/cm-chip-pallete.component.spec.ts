import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmChipPalleteComponent } from './cm-chip-pallete.component';

describe('CmChipPalleteComponent', () => {
  let component: CmChipPalleteComponent;
  let fixture: ComponentFixture<CmChipPalleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmChipPalleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmChipPalleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
