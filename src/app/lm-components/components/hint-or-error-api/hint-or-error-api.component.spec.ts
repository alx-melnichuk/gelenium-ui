import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintOrErrorApiComponent } from './hint-or-error-api.component';

describe('HintOrErrorApiComponent', () => {
  let component: HintOrErrorApiComponent;
  let fixture: ComponentFixture<HintOrErrorApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HintOrErrorApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HintOrErrorApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
