import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSizeComponent } from './button-size.component';

describe('ButtonSizeComponent', () => {
  let component: ButtonSizeComponent;
  let fixture: ComponentFixture<ButtonSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonSizeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
