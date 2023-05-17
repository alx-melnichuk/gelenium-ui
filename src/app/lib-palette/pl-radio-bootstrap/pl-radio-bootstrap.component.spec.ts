import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlRadioBootstrapComponent } from './pl-radio-bootstrap.component';

describe('PlRadioBootstrapComponent', () => {
  let component: PlRadioBootstrapComponent;
  let fixture: ComponentFixture<PlRadioBootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlRadioBootstrapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlRadioBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
