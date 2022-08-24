import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrRegexRemoveBasicComponent } from './dr-regex-remove-basic.component';

describe('DrRegexRemoveBasicComponent', () => {
  let component: DrRegexRemoveBasicComponent;
  let fixture: ComponentFixture<DrRegexRemoveBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrRegexRemoveBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrRegexRemoveBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
