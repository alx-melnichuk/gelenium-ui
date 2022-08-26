import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlButtonBootstrapComponent } from './pl-button-bootstrap.component';

describe('PlButtonBootstrapComponent', () => {
  let component: PlButtonBootstrapComponent;
  let fixture: ComponentFixture<PlButtonBootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlButtonBootstrapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlButtonBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
