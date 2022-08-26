import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrRegexCheckComponent } from './dr-regex-check.component';

describe('DrRegexCheckComponent', () => {
  let component: DrRegexCheckComponent;
  let fixture: ComponentFixture<DrRegexCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrRegexCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrRegexCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
