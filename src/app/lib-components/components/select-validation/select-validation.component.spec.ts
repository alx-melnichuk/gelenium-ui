import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectValidationComponent } from './select-validation.component';

describe('SelectValidationComponent', () => {
  let component: SelectValidationComponent;
  let fixture: ComponentFixture<SelectValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectValidationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
