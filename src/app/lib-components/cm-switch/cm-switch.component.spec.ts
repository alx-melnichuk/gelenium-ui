import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSwitchComponent } from './cm-switch.component';

describe('CmSwitchComponent', () => {
  let component: CmSwitchComponent;
  let fixture: ComponentFixture<CmSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmSwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
