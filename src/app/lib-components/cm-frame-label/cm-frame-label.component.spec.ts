import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmFrameLabelComponent } from './cm-frame-label.component';

describe('CmFrameLabelComponent', () => {
  let component: CmFrameLabelComponent;
  let fixture: ComponentFixture<CmFrameLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmFrameLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmFrameLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
