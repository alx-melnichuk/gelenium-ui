import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlInputBootstrapComponent } from './pl-input-bootstrap.component';

describe('PlInputBootstrapComponent', () => {
  let component: PlInputBootstrapComponent;
  let fixture: ComponentFixture<PlInputBootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlInputBootstrapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlInputBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
