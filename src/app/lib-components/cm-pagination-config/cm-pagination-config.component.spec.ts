import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmPaginationConfigComponent } from './cm-pagination-config.component';

describe('CmPaginationConfigComponent', () => {
  let component: CmPaginationConfigComponent;
  let fixture: ComponentFixture<CmPaginationConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmPaginationConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmPaginationConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
