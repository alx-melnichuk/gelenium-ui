import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintOrErrorComponent } from './hint-or-error.component';

describe('HintOrErrorComponent', () => {
  let component: HintOrErrorComponent;
  let fixture: ComponentFixture<HintOrErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HintOrErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HintOrErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
