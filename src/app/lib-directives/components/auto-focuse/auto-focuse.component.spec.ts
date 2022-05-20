import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFocuseComponent } from './auto-focuse.component';

describe('AutoFocuseComponent', () => {
  let component: AutoFocuseComponent;
  let fixture: ComponentFixture<AutoFocuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoFocuseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFocuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
