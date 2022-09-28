import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSwitchCustomizationComponent } from './cm-switch-customization.component';

describe('CmSwitchCustomizationComponent', () => {
  let component: CmSwitchCustomizationComponent;
  let fixture: ComponentFixture<CmSwitchCustomizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSwitchCustomizationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSwitchCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
