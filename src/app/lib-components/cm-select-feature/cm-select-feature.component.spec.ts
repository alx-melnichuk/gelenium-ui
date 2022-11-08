import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSelectFeatureComponent } from './cm-select-feature.component';

describe('CmSelectFeatureComponent', () => {
  let component: CmSelectFeatureComponent;
  let fixture: ComponentFixture<CmSelectFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmSelectFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmSelectFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
