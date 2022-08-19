import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmButtonSizeComponent } from './cm-button-size.component';

describe('CmButtonSizeComponent', () => {
  let component: CmButtonSizeComponent;
  let fixture: ComponentFixture<CmButtonSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmButtonSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmButtonSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
