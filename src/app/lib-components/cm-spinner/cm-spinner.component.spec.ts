import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSpinnerComponent } from './cm-spinner.component';

describe('CmSpinnerComponent', () => {
  let component: CmSpinnerComponent;
  let fixture: ComponentFixture<CmSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
