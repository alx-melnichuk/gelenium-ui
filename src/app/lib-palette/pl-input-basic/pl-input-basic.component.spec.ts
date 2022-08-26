import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlInputBasicComponent } from './pl-input-basic.component';

describe('PlInputBasicComponent', () => {
  let component: PlInputBasicComponent;
  let fixture: ComponentFixture<PlInputBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlInputBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlInputBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
