import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaAttributesComponent } from './textarea-attributes.component';

describe('TextareaAttributesComponent', () => {
  let component: TextareaAttributesComponent;
  let fixture: ComponentFixture<TextareaAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextareaAttributesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
