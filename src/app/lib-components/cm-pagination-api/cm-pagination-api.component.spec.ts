import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmPaginationApiComponent } from './cm-pagination-api.component';

describe('CmPaginationApiComponent', () => {
  let component: CmPaginationApiComponent;
  let fixture: ComponentFixture<CmPaginationApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmPaginationApiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmPaginationApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
