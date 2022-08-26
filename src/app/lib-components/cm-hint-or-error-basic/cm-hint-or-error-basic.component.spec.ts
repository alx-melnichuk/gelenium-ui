import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmHintOrErrorBasicComponent } from './cm-hint-or-error-basic.component';

describe('CmHintOrErrorBasicComponent', () => {
  let component: CmHintOrErrorBasicComponent;
  let fixture: ComponentFixture<CmHintOrErrorBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmHintOrErrorBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmHintOrErrorBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
