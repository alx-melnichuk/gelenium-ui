import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlFrameCustomerComponent } from './pl-frame-customer.component';

describe('PlFrameCustomerComponent', () => {
  let component: PlFrameCustomerComponent;
  let fixture: ComponentFixture<PlFrameCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlFrameCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlFrameCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
