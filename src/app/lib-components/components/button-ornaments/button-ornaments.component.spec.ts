import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonOrnamentsComponent } from './button-ornaments.component';

describe('ButtonOrnamentsComponent', () => {
  let component: ButtonOrnamentsComponent;
  let fixture: ComponentFixture<ButtonOrnamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonOrnamentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonOrnamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
