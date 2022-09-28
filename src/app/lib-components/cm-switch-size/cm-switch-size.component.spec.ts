import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSwitchSizeComponent } from './cm-switch-size.component';

describe('CmSwitchSizeComponent', () => {
  let component: CmSwitchSizeComponent;
  let fixture: ComponentFixture<CmSwitchSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSwitchSizeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSwitchSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
