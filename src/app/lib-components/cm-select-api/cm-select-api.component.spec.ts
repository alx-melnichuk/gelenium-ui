import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSelectApiComponent } from './cm-select-api.component';

describe('CmSelectApiComponent', () => {
  let component: CmSelectApiComponent;
  let fixture: ComponentFixture<CmSelectApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmSelectApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmSelectApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
