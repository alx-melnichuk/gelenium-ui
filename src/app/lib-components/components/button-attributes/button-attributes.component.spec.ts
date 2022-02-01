import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAttributesComponent } from './button-attributes.component';

describe('ButtonAttributesComponent', () => {
  let component: ButtonAttributesComponent;
  let fixture: ComponentFixture<ButtonAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonAttributesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
