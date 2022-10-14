import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSwitchApiComponent } from './cm-switch-api.component';

describe('CmSwitchApiComponent', () => {
  let component: CmSwitchApiComponent;
  let fixture: ComponentFixture<CmSwitchApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSwitchApiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSwitchApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
