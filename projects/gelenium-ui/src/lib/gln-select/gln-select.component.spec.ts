import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnSelectComponent } from './gln-select.component';

describe('GlnSelectComponent', () => {
  let component: GlnSelectComponent;
  let fixture: ComponentFixture<GlnSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnSelectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
