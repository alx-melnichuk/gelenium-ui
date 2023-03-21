import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlPaginationBootstrapComponent } from './pl-pagination-bootstrap.component';

describe('PlPaginationBootstrapComponent', () => {
  let component: PlPaginationBootstrapComponent;
  let fixture: ComponentFixture<PlPaginationBootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlPaginationBootstrapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlPaginationBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
