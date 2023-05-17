import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlCheckboxBasicComponent } from './pl-checkbox-basic.component';

describe('PlCheckboxBasicComponent', () => {
  let component: PlCheckboxBasicComponent;
  let fixture: ComponentFixture<PlCheckboxBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlCheckboxBasicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlCheckboxBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
