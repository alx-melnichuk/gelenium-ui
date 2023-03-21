import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSpinnerBasicComponent } from './cm-spinner-basic.component';

describe('CmSpinnerBasicComponent', () => {
  let component: CmSpinnerBasicComponent;
  let fixture: ComponentFixture<CmSpinnerBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSpinnerBasicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSpinnerBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
