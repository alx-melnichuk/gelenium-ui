import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNumericalValueComponent } from './input-numerical-value.component';

describe('InputNumericalValueComponent', () => {
  let component: InputNumericalValueComponent;
  let fixture: ComponentFixture<InputNumericalValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputNumericalValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputNumericalValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
