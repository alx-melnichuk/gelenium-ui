import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaCapabilityComponent } from './textarea-capability.component';

describe('TextareaCapabilityComponent', () => {
  let component: TextareaCapabilityComponent;
  let fixture: ComponentFixture<TextareaCapabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextareaCapabilityComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaCapabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
