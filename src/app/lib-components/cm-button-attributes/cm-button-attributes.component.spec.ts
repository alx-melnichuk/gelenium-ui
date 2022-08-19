import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmButtonAttributesComponent } from './cm-button-attributes.component';

describe('CmButtonAttributesComponent', () => {
  let component: CmButtonAttributesComponent;
  let fixture: ComponentFixture<CmButtonAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmButtonAttributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmButtonAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
