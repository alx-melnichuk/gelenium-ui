import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmButtonComponent } from './cm-button.component';

describe('CmButtonComponent', () => {
  let component: CmButtonComponent;
  let fixture: ComponentFixture<CmButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
