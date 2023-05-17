import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnCheckboxComponent } from './gln-checkbox.component';

describe('GlnCheckboxComponent', () => {
  let component: GlnCheckboxComponent;
  let fixture: ComponentFixture<GlnCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlnCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
