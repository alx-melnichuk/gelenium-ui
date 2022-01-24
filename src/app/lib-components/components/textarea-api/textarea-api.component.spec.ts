import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaApiComponent } from './textarea-api.component';

describe('TextareaApiComponent', () => {
  let component: TextareaApiComponent;
  let fixture: ComponentFixture<TextareaApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextareaApiComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
