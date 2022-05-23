import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFocuseApiComponent } from './auto-focuse-api.component';

describe('AutoFocuseApiComponent', () => {
  let component: AutoFocuseApiComponent;
  let fixture: ComponentFixture<AutoFocuseApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoFocuseApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFocuseApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
