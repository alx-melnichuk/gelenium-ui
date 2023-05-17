import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmCheckboxApiComponent } from './cm-checkbox-api.component';

describe('CmCheckboxApiComponent', () => {
  let component: CmCheckboxApiComponent;
  let fixture: ComponentFixture<CmCheckboxApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmCheckboxApiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmCheckboxApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
