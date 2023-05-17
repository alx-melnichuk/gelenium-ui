import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmCheckboxBasicComponent } from './cm-checkbox-basic.component';

describe('CmCheckboxBasicComponent', () => {
  let component: CmCheckboxBasicComponent;
  let fixture: ComponentFixture<CmCheckboxBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmCheckboxBasicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmCheckboxBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
