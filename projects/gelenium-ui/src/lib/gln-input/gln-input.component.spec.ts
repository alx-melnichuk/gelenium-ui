import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnInputComponent } from './gln-input.component';

describe('GlnInputComponent', () => {
  let component: GlnInputComponent;
  let fixture: ComponentFixture<GlnInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlnInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
