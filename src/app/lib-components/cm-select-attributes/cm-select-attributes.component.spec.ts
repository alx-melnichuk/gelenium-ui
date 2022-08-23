import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSelectAttributesComponent } from './cm-select-attributes.component';

describe('CmSelectAttributesComponent', () => {
  let component: CmSelectAttributesComponent;
  let fixture: ComponentFixture<CmSelectAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmSelectAttributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmSelectAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
