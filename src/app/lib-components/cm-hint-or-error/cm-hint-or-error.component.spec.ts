import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmHintOrErrorComponent } from './cm-hint-or-error.component';

describe('CmHintOrErrorComponent', () => {
  let component: CmHintOrErrorComponent;
  let fixture: ComponentFixture<CmHintOrErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmHintOrErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmHintOrErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
