import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmPaginationOrnamentsComponent } from './cm-pagination-ornaments.component';

describe('CmPaginationOrnamentsComponent', () => {
  let component: CmPaginationOrnamentsComponent;
  let fixture: ComponentFixture<CmPaginationOrnamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmPaginationOrnamentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmPaginationOrnamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
