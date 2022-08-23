import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSelectTriggerComponent } from './cm-select-trigger.component';

describe('CmSelectTriggerComponent', () => {
  let component: CmSelectTriggerComponent;
  let fixture: ComponentFixture<CmSelectTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmSelectTriggerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmSelectTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
