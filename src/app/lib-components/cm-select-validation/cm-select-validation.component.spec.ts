import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSelectValidationComponent } from './cm-select-validation.component';

describe('CmSelectValidationComponent', () => {
  let component: CmSelectValidationComponent;
  let fixture: ComponentFixture<CmSelectValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmSelectValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmSelectValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
