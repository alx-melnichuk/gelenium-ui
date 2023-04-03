import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnRadioGroupComponent } from './gln-radio-group.component';

describe('GlnRadioGroupComponent', () => {
  let component: GlnRadioGroupComponent;
  let fixture: ComponentFixture<GlnRadioGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnRadioGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlnRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
