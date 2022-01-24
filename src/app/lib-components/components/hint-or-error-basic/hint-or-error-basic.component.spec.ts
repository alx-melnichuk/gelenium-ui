import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintOrErrorBasicComponent } from './hint-or-error-basic.component';

describe('HintOrErrorBasicComponent', () => {
  let component: HintOrErrorBasicComponent;
  let fixture: ComponentFixture<HintOrErrorBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HintOrErrorBasicComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HintOrErrorBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
