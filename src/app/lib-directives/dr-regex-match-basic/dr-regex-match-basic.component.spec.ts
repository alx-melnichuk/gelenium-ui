import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrRegexMatchBasicComponent } from './dr-regex-match-basic.component';

describe('DrRegexMatchBasicComponent', () => {
  let component: DrRegexMatchBasicComponent;
  let fixture: ComponentFixture<DrRegexMatchBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrRegexMatchBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrRegexMatchBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
