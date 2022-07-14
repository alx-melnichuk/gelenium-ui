import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnOptionComponent } from './gln-option.component';

describe('GlnOptionComponent', () => {
  let component: GlnOptionComponent;
  let fixture: ComponentFixture<GlnOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnOptionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
