import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmPaginationBorderComponent } from './cm-pagination-border.component';

describe('CmPaginationBorderComponent', () => {
  let component: CmPaginationBorderComponent;
  let fixture: ComponentFixture<CmPaginationBorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmPaginationBorderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmPaginationBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
