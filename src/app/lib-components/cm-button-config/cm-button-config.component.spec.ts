import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmButtonConfigComponent } from './cm-button-config.component';

describe('CmButtonConfigComponent', () => {
  let component: CmButtonConfigComponent;
  let fixture: ComponentFixture<CmButtonConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmButtonConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmButtonConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
