import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmFrameHelperTextComponent } from './cm-frame-helper-text.component';

describe('CmFrameHelperTextComponent', () => {
  let component: CmFrameHelperTextComponent;
  let fixture: ComponentFixture<CmFrameHelperTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmFrameHelperTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmFrameHelperTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
