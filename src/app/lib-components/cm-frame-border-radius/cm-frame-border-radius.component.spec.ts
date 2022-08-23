import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmFrameBorderRadiusComponent } from './cm-frame-border-radius.component';

describe('CmFrameBorderRadiusComponent', () => {
  let component: CmFrameBorderRadiusComponent;
  let fixture: ComponentFixture<CmFrameBorderRadiusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmFrameBorderRadiusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmFrameBorderRadiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
