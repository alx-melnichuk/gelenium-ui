import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmButtonBasicComponent } from './cm-button-basic.component';

describe('CmButtonBasicComponent', () => {
  let component: CmButtonBasicComponent;
  let fixture: ComponentFixture<CmButtonBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmButtonBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmButtonBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
