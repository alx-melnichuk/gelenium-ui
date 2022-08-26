import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlSelectBasicComponent } from './pl-select-basic.component';

describe('PlSelectBasicComponent', () => {
  let component: PlSelectBasicComponent;
  let fixture: ComponentFixture<PlSelectBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlSelectBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlSelectBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
