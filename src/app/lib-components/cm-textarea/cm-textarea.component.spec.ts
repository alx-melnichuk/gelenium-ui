import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmTextareaComponent } from './cm-textarea.component';

describe('CmTextareaComponent', () => {
  let component: CmTextareaComponent;
  let fixture: ComponentFixture<CmTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmTextareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
