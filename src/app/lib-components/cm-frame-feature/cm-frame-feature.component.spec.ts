import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmFrameFeatureComponent } from './cm-frame-feature.component';

describe('CmFrameFeatureComponent', () => {
  let component: CmFrameFeatureComponent;
  let fixture: ComponentFixture<CmFrameFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmFrameFeatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmFrameFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
