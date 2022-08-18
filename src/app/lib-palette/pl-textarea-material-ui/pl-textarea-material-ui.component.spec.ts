import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlTextareaMaterialUiComponent } from './pl-textarea-material-ui.component';

describe('PlTextareaMaterialUiComponent', () => {
  let component: PlTextareaMaterialUiComponent;
  let fixture: ComponentFixture<PlTextareaMaterialUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlTextareaMaterialUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlTextareaMaterialUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
