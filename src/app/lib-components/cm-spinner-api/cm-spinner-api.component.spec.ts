import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSpinnerApiComponent } from './cm-spinner-api.component';

describe('CmSpinnerApiComponent', () => {
  let component: CmSpinnerApiComponent;
  let fixture: ComponentFixture<CmSpinnerApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSpinnerApiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSpinnerApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
