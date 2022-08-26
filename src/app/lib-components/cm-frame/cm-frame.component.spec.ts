import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmFrameComponent } from './cm-frame.component';

describe('CmFrameComponent', () => {
  let component: CmFrameComponent;
  let fixture: ComponentFixture<CmFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmFrameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
