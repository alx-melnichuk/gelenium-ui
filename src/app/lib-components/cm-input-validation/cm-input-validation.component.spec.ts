import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmInputValidationComponent } from './cm-input-validation.component';

describe('CmInputValidationComponent', () => {
  let component: CmInputValidationComponent;
  let fixture: ComponentFixture<CmInputValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmInputValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmInputValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
