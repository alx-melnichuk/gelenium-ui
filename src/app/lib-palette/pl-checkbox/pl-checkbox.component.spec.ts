import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlCheckboxComponent } from './pl-checkbox.component';

describe('PlCheckboxComponent', () => {
  let component: PlCheckboxComponent;
  let fixture: ComponentFixture<PlCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
