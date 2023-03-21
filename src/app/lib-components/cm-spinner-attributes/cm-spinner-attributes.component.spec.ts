import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSpinnerAttributesComponent } from './cm-spinner-attributes.component';

describe('CmSpinnerAttributesComponent', () => {
  let component: CmSpinnerAttributesComponent;
  let fixture: ComponentFixture<CmSpinnerAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSpinnerAttributesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSpinnerAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
