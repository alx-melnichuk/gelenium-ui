import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnHintOrErrorComponent } from './gln-hint-or-error.component';

describe('GlnHintOrErrorComponent', () => {
  let component: GlnHintOrErrorComponent;
  let fixture: ComponentFixture<GlnHintOrErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnHintOrErrorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnHintOrErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
