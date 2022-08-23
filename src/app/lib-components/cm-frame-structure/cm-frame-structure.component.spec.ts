import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmFrameStructureComponent } from './cm-frame-structure.component';

describe('CmFrameStructureComponent', () => {
  let component: CmFrameStructureComponent;
  let fixture: ComponentFixture<CmFrameStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmFrameStructureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmFrameStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
