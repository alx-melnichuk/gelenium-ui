import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmTextareaConfigComponent } from './cm-textarea-config.component';

describe('CmTextareaConfigComponent', () => {
  let component: CmTextareaConfigComponent;
  let fixture: ComponentFixture<CmTextareaConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmTextareaConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmTextareaConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
