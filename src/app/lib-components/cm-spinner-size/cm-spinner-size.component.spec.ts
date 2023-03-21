import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSpinnerSizeComponent } from './cm-spinner-size.component';

describe('CmSpinnerSizeComponent', () => {
  let component: CmSpinnerSizeComponent;
  let fixture: ComponentFixture<CmSpinnerSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSpinnerSizeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSpinnerSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
