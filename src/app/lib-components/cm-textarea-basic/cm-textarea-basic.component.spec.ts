import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmTextareaBasicComponent } from './cm-textarea-basic.component';

describe('CmTextareaBasicComponent', () => {
  let component: CmTextareaBasicComponent;
  let fixture: ComponentFixture<CmTextareaBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmTextareaBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmTextareaBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
