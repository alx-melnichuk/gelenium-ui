import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSpinnerConfigComponent } from './cm-spinner-config.component';

describe('CmSpinnerConfigComponent', () => {
  let component: CmSpinnerConfigComponent;
  let fixture: ComponentFixture<CmSpinnerConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSpinnerConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSpinnerConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
