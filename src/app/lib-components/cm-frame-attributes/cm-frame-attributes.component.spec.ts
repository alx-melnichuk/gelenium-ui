import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmFrameAttributesComponent } from './cm-frame-attributes.component';

describe('CmFrameAttributesComponent', () => {
  let component: CmFrameAttributesComponent;
  let fixture: ComponentFixture<CmFrameAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmFrameAttributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmFrameAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
