import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaValidationComponent } from './textarea-validation.component';

describe('TextareaValidationComponent', () => {
  let component: TextareaValidationComponent;
  let fixture: ComponentFixture<TextareaValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextareaValidationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
