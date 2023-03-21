import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmPaginationSizeComponent } from './cm-pagination-size.component';

describe('CmPaginationSizeComponent', () => {
  let component: CmPaginationSizeComponent;
  let fixture: ComponentFixture<CmPaginationSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmPaginationSizeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmPaginationSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
