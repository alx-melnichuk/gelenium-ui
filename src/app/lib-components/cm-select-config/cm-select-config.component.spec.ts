import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSelectConfigComponent } from './cm-select-config.component';

describe('CmSelectConfigComponent', () => {
  let component: CmSelectConfigComponent;
  let fixture: ComponentFixture<CmSelectConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmSelectConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmSelectConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
