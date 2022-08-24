import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrRegexCheckApiComponent } from './dr-regex-check-api.component';

describe('DrRegexCheckApiComponent', () => {
  let component: DrRegexCheckApiComponent;
  let fixture: ComponentFixture<DrRegexCheckApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrRegexCheckApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrRegexCheckApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
