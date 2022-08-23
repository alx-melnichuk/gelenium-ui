import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSelectOrnamentsComponent } from './cm-select-ornaments.component';

describe('CmSelectOrnamentsComponent', () => {
  let component: CmSelectOrnamentsComponent;
  let fixture: ComponentFixture<CmSelectOrnamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmSelectOrnamentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmSelectOrnamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
