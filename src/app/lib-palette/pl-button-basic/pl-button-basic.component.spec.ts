import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlButtonBasicComponent } from './pl-button-basic.component';

describe('PlButtonBasicComponent', () => {
  let component: PlButtonBasicComponent;
  let fixture: ComponentFixture<PlButtonBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlButtonBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlButtonBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
