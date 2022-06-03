import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnTextareaComponent } from './gln-textarea.component';

describe('GlnTextareaComponent', () => {
  let component: GlnTextareaComponent;
  let fixture: ComponentFixture<GlnTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlnTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
