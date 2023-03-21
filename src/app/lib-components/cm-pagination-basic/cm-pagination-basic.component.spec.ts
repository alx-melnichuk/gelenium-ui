import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmPaginationBasicComponent } from './cm-pagination-basic.component';

describe('CmPaginationBasicComponent', () => {
  let component: CmPaginationBasicComponent;
  let fixture: ComponentFixture<CmPaginationBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmPaginationBasicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmPaginationBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
