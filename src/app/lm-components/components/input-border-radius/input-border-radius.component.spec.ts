import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBorderRadiusComponent } from './input-border-radius.component';

describe('InputBorderRadiusComponent', () => {
  let component: InputBorderRadiusComponent;
  let fixture: ComponentFixture<InputBorderRadiusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputBorderRadiusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBorderRadiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
