import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlSelectBootstrapComponent } from './pl-select-bootstrap.component';

describe('PlSelectBootstrapComponent', () => {
  let component: PlSelectBootstrapComponent;
  let fixture: ComponentFixture<PlSelectBootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlSelectBootstrapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlSelectBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
