import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlButtonMaterialUiComponent } from './pl-button-material-ui.component';

describe('PlButtonMaterialUiComponent', () => {
  let component: PlButtonMaterialUiComponent;
  let fixture: ComponentFixture<PlButtonMaterialUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlButtonMaterialUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlButtonMaterialUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
