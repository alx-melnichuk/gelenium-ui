import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlTextareaBasicComponent } from './pl-textarea-basic.component';

describe('PlTextareaBasicComponent', () => {
  let component: PlTextareaBasicComponent;
  let fixture: ComponentFixture<PlTextareaBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlTextareaBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlTextareaBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
