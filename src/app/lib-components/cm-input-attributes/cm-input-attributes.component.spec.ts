import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmInputAttributesComponent } from './cm-input-attributes.component';

describe('CmInputAttributesComponent', () => {
  let component: CmInputAttributesComponent;
  let fixture: ComponentFixture<CmInputAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmInputAttributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmInputAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
