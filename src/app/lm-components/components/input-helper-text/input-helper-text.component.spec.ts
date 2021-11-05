import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputHelperTextComponent } from './input-helper-text.component';

describe('InputHelperTextComponent', () => {
  let component: InputHelperTextComponent;
  let fixture: ComponentFixture<InputHelperTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputHelperTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputHelperTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
