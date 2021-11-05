import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputItemSizeComponent } from './input-item-size.component';

describe('InputItemSizeComponent', () => {
  let component: InputItemSizeComponent;
  let fixture: ComponentFixture<InputItemSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputItemSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputItemSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
