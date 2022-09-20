import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSwitchBasicComponent } from './cm-switch-basic.component';

describe('CmSwitchBasicComponent', () => {
  let component: CmSwitchBasicComponent;
  let fixture: ComponentFixture<CmSwitchBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmSwitchBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmSwitchBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
