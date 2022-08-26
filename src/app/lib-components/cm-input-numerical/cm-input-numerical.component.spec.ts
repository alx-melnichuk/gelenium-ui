import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmInputNumericalComponent } from './cm-input-numerical.component';

describe('CmInputNumericalComponent', () => {
  let component: CmInputNumericalComponent;
  let fixture: ComponentFixture<CmInputNumericalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmInputNumericalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmInputNumericalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
