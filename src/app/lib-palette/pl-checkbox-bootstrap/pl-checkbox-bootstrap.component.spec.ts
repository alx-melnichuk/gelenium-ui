import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlCheckboxBootstrapComponent } from './pl-checkbox-bootstrap.component';

describe('PlCheckboxBootstrapComponent', () => {
  let component: PlCheckboxBootstrapComponent;
  let fixture: ComponentFixture<PlCheckboxBootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlCheckboxBootstrapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlCheckboxBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
