import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmFrameConfigComponent } from './cm-frame-config.component';

describe('CmFrameConfigComponent', () => {
  let component: CmFrameConfigComponent;
  let fixture: ComponentFixture<CmFrameConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmFrameConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmFrameConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
