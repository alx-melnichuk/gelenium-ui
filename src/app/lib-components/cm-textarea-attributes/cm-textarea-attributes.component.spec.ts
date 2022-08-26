import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmTextareaAttributesComponent } from './cm-textarea-attributes.component';

describe('CmTextareaAttributesComponent', () => {
  let component: CmTextareaAttributesComponent;
  let fixture: ComponentFixture<CmTextareaAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmTextareaAttributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmTextareaAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
