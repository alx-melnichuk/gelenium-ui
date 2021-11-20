import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaBasicComponent } from './textarea-basic.component';

describe('TextareaBasicComponent', () => {
  let component: TextareaBasicComponent;
  let fixture: ComponentFixture<TextareaBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextareaBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
