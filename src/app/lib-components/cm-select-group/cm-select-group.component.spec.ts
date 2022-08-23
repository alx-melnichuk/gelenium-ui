import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSelectGroupComponent } from './cm-select-group.component';

describe('CmSelectGroupComponent', () => {
  let component: CmSelectGroupComponent;
  let fixture: ComponentFixture<CmSelectGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmSelectGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmSelectGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
