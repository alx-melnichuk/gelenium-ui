import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrRegexRemoveComponent } from './dr-regex-remove.component';

describe('DrRegexRemoveComponent', () => {
  let component: DrRegexRemoveComponent;
  let fixture: ComponentFixture<DrRegexRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrRegexRemoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrRegexRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
