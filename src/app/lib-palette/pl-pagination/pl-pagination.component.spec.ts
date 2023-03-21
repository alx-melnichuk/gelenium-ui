import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlPaginationComponent } from './pl-pagination.component';

describe('PlPaginationComponent', () => {
  let component: PlPaginationComponent;
  let fixture: ComponentFixture<PlPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
