import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmInputApiComponent } from './cm-input-api.component';

describe('CmInputApiComponent', () => {
  let component: CmInputApiComponent;
  let fixture: ComponentFixture<CmInputApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmInputApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmInputApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
