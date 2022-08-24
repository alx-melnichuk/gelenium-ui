import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrRegexMatchApiComponent } from './dr-regex-match-api.component';

describe('DrRegexMatchApiComponent', () => {
  let component: DrRegexMatchApiComponent;
  let fixture: ComponentFixture<DrRegexMatchApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrRegexMatchApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrRegexMatchApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
