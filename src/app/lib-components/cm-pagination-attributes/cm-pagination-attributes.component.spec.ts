import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmPaginationAttributesComponent } from './cm-pagination-attributes.component';

describe('CmPaginationAttributesComponent', () => {
  let component: CmPaginationAttributesComponent;
  let fixture: ComponentFixture<CmPaginationAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmPaginationAttributesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmPaginationAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
