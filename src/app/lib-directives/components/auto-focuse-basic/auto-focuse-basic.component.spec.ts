import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFocuseBasicComponent } from './auto-focuse-basic.component';

describe('AutoFocuseBasicComponent', () => {
  let component: AutoFocuseBasicComponent;
  let fixture: ComponentFixture<AutoFocuseBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoFocuseBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFocuseBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
