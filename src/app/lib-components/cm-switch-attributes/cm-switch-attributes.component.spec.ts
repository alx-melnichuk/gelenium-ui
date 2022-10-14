import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSwitchAttributesComponent } from './cm-switch-attributes.component';

describe('CmSwitchAttributesComponent', () => {
  let component: CmSwitchAttributesComponent;
  let fixture: ComponentFixture<CmSwitchAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSwitchAttributesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSwitchAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
