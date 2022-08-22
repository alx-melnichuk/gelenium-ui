import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmHintOrErrorApiComponent } from './cm-hint-or-error-api.component';

describe('CmHintOrErrorApiComponent', () => {
  let component: CmHintOrErrorApiComponent;
  let fixture: ComponentFixture<CmHintOrErrorApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmHintOrErrorApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmHintOrErrorApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
