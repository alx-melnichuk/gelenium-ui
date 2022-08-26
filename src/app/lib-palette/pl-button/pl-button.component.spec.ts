import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlButtonComponent } from './pl-button.component';

describe('PlButtonComponent', () => {
  let component: PlButtonComponent;
  let fixture: ComponentFixture<PlButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
