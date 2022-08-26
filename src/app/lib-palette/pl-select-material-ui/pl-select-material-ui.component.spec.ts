import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlSelectMaterialUiComponent } from './pl-select-material-ui.component';

describe('PlSelectMaterialUiComponent', () => {
  let component: PlSelectMaterialUiComponent;
  let fixture: ComponentFixture<PlSelectMaterialUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlSelectMaterialUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlSelectMaterialUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
