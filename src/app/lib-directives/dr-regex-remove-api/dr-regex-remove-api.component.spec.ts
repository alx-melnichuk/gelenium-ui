import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrRegexRemoveApiComponent } from './dr-regex-remove-api.component';

describe('DrRegexRemoveApiComponent', () => {
  let component: DrRegexRemoveApiComponent;
  let fixture: ComponentFixture<DrRegexRemoveApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrRegexRemoveApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrRegexRemoveApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
