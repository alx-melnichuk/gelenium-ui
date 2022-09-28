import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSwitchConfigComponent } from './cm-switch-config.component';

describe('CmSwitchConfigComponent', () => {
  let component: CmSwitchConfigComponent;
  let fixture: ComponentFixture<CmSwitchConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSwitchConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSwitchConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
