import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlInputMaterialUiComponent } from './pl-input-material-ui.component';

describe('PlInputMaterialUiComponent', () => {
  let component: PlInputMaterialUiComponent;
  let fixture: ComponentFixture<PlInputMaterialUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlInputMaterialUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlInputMaterialUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
