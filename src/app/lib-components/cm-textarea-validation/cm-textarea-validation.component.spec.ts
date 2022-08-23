import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmTextareaValidationComponent } from './cm-textarea-validation.component';

describe('CmTextareaValidationComponent', () => {
  let component: CmTextareaValidationComponent;
  let fixture: ComponentFixture<CmTextareaValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmTextareaValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmTextareaValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
