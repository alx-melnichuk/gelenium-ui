import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmButtonBorderRadiusComponent } from './cm-button-border-radius.component';

describe('CmButtonBorderRadiusComponent', () => {
  let component: CmButtonBorderRadiusComponent;
  let fixture: ComponentFixture<CmButtonBorderRadiusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmButtonBorderRadiusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmButtonBorderRadiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
