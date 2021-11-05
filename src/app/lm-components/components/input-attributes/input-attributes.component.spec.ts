import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAttributesComponent } from './input-attributes.component';

describe('InputAttributesComponent', () => {
  let component: InputAttributesComponent;
  let fixture: ComponentFixture<InputAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputAttributesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
