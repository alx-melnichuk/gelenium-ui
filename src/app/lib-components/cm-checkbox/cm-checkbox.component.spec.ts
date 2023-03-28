import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmCheckboxComponent } from './cm-checkbox.component';

describe('CmCheckboxComponent', () => {
  let component: CmCheckboxComponent;
  let fixture: ComponentFixture<CmCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
