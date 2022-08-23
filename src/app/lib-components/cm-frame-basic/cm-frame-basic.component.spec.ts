import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmFrameBasicComponent } from './cm-frame-basic.component';

describe('CmFrameBasicComponent', () => {
  let component: CmFrameBasicComponent;
  let fixture: ComponentFixture<CmFrameBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmFrameBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmFrameBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
