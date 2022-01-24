import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNumericalComponent } from './input-numerical.component';

describe('InputNumericalComponent', () => {
  let component: InputNumericalComponent;
  let fixture: ComponentFixture<InputNumericalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputNumericalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputNumericalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
