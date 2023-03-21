import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlPaginationMaterialUiComponent } from './pl-pagination-material-ui.component';

describe('PlPaginationMaterialUiComponent', () => {
  let component: PlPaginationMaterialUiComponent;
  let fixture: ComponentFixture<PlPaginationMaterialUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlPaginationMaterialUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlPaginationMaterialUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
