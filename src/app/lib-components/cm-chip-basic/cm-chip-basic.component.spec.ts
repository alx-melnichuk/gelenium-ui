import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmChipBasicComponent } from './cm-chip-basic.component';

describe('CmChipBasicComponent', () => {
  let component: CmChipBasicComponent;
  let fixture: ComponentFixture<CmChipBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmChipBasicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmChipBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
