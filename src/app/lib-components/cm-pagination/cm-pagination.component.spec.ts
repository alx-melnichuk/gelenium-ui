import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmPaginationComponent } from './cm-pagination.component';

describe('CmPaginationComponent', () => {
  let component: CmPaginationComponent;
  let fixture: ComponentFixture<CmPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
