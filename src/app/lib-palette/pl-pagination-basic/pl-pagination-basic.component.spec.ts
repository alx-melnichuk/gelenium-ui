import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlPaginationBasicComponent } from './pl-pagination-basic.component';

describe('PlPaginationBasicComponent', () => {
  let component: PlPaginationBasicComponent;
  let fixture: ComponentFixture<PlPaginationBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlPaginationBasicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlPaginationBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
