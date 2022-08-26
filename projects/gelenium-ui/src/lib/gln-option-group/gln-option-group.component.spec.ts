import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnOptionGroupComponent } from './gln-option-group.component';

describe('GlnOptionGroupComponent', () => {
  let component: GlnOptionGroupComponent;
  let fixture: ComponentFixture<GlnOptionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnOptionGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnOptionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
