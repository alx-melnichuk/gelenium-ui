import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnTextareaComponent } from './grn-textarea.component';

describe('GrnTextareaComponent', () => {
  let component: GrnTextareaComponent;
  let fixture: ComponentFixture<GrnTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrnTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
