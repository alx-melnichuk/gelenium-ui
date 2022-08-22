import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmInputBasicComponent } from './cm-input-basic.component';

describe('CmInputBasicComponent', () => {
  let component: CmInputBasicComponent;
  let fixture: ComponentFixture<CmInputBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmInputBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmInputBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
