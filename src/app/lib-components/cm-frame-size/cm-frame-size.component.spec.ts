import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmFrameSizeComponent } from './cm-frame-size.component';

describe('CmFrameSizeComponent', () => {
  let component: CmFrameSizeComponent;
  let fixture: ComponentFixture<CmFrameSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmFrameSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmFrameSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
