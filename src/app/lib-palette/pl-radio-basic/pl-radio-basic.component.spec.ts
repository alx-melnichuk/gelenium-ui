import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlRadioBasicComponent } from './pl-radio-basic.component';

describe('PlRadioBasicComponent', () => {
  let component: PlRadioBasicComponent;
  let fixture: ComponentFixture<PlRadioBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlRadioBasicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlRadioBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
