import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmCheckboxConfigComponent } from './cm-checkbox-config.component';

describe('CmCheckboxConfigComponent', () => {
  let component: CmCheckboxConfigComponent;
  let fixture: ComponentFixture<CmCheckboxConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmCheckboxConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmCheckboxConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
