import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlTextareaBootstrapComponent } from './pl-textarea-bootstrap.component';

describe('PlTextareaBootstrapComponent', () => {
  let component: PlTextareaBootstrapComponent;
  let fixture: ComponentFixture<PlTextareaBootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlTextareaBootstrapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlTextareaBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
