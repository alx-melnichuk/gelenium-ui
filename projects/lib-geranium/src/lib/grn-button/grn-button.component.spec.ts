import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnButtonComponent } from './grn-button.component';

describe('GrnButtonComponent', () => {
  let component: GrnButtonComponent;
  let fixture: ComponentFixture<GrnButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrnButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
