import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlTextareaComponent } from './pl-textarea.component';

describe('PlTextareaComponent', () => {
  let component: PlTextareaComponent;
  let fixture: ComponentFixture<PlTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlTextareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
