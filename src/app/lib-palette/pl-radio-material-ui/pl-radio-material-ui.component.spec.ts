import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlRadioMaterialUiComponent } from './pl-radio-material-ui.component';

describe('PlRadioMaterialUiComponent', () => {
  let component: PlRadioMaterialUiComponent;
  let fixture: ComponentFixture<PlRadioMaterialUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlRadioMaterialUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlRadioMaterialUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
