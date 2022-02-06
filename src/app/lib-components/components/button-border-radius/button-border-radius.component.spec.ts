import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBorderRadiusComponent } from './button-border-radius.component';

describe('ButtonBorderRadiusComponent', () => {
  let component: ButtonBorderRadiusComponent;
  let fixture: ComponentFixture<ButtonBorderRadiusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonBorderRadiusComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonBorderRadiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
