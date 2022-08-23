import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSelectComponent } from './cm-select.component';

describe('CmSelectComponent', () => {
  let component: CmSelectComponent;
  let fixture: ComponentFixture<CmSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
