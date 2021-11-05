import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnInputComponent } from './grn-input.component';

describe('GrnInputComponent', () => {
  let component: GrnInputComponent;
  let fixture: ComponentFixture<GrnInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrnInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
