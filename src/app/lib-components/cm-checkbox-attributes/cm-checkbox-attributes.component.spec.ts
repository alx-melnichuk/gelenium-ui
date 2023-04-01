import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmCheckboxAttributesComponent } from './cm-checkbox-attributes.component';

describe('CmCheckboxAttributesComponent', () => {
  let component: CmCheckboxAttributesComponent;
  let fixture: ComponentFixture<CmCheckboxAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmCheckboxAttributesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmCheckboxAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
