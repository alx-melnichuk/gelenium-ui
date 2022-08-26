import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrRegexMatchComponent } from './dr-regex-match.component';

describe('DrRegexMatchComponent', () => {
  let component: DrRegexMatchComponent;
  let fixture: ComponentFixture<DrRegexMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrRegexMatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrRegexMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
