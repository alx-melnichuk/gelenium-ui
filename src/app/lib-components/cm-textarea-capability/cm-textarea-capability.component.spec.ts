import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmTextareaCapabilityComponent } from './cm-textarea-capability.component';

describe('CmTextareaCapabilityComponent', () => {
  let component: CmTextareaCapabilityComponent;
  let fixture: ComponentFixture<CmTextareaCapabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmTextareaCapabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmTextareaCapabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
