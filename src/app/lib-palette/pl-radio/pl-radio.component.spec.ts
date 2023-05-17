import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlRadioComponent } from './pl-radio.component';

describe('PlRadioComponent', () => {
  let component: PlRadioComponent;
  let fixture: ComponentFixture<PlRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlRadioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
