import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmFrameApiComponent } from './cm-frame-api.component';

describe('CmFrameApiComponent', () => {
  let component: CmFrameApiComponent;
  let fixture: ComponentFixture<CmFrameApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmFrameApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmFrameApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
