import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmTextareaApiComponent } from './cm-textarea-api.component';

describe('CmTextareaApiComponent', () => {
  let component: CmTextareaApiComponent;
  let fixture: ComponentFixture<CmTextareaApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmTextareaApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmTextareaApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
