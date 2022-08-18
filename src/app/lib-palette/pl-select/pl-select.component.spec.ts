import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlSelectComponent } from './pl-select.component';

describe('PlSelectComponent', () => {
  let component: PlSelectComponent;
  let fixture: ComponentFixture<PlSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
