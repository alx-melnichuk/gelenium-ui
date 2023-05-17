import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlCheckboxMaterialUiComponent } from './pl-checkbox-material-ui.component';

describe('PlCheckboxMaterialUiComponent', () => {
  let component: PlCheckboxMaterialUiComponent;
  let fixture: ComponentFixture<PlCheckboxMaterialUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlCheckboxMaterialUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlCheckboxMaterialUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
