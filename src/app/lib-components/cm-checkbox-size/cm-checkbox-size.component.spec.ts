import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmCheckboxSizeComponent } from './cm-checkbox-size.component';

describe('CmCheckboxSizeComponent', () => {
  let component: CmCheckboxSizeComponent;
  let fixture: ComponentFixture<CmCheckboxSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmCheckboxSizeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmCheckboxSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
