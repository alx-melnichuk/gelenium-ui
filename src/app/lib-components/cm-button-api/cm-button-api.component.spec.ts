import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmButtonApiComponent } from './cm-button-api.component';

describe('CmButtonApiComponent', () => {
  let component: CmButtonApiComponent;
  let fixture: ComponentFixture<CmButtonApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmButtonApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmButtonApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
