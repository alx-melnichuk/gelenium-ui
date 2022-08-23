import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSelectBasicComponent } from './cm-select-basic.component';

describe('CmSelectBasicComponent', () => {
  let component: CmSelectBasicComponent;
  let fixture: ComponentFixture<CmSelectBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmSelectBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmSelectBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
