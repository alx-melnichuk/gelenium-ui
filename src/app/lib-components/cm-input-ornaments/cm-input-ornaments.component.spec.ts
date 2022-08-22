import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmInputOrnamentsComponent } from './cm-input-ornaments.component';

describe('CmInputOrnamentsComponent', () => {
  let component: CmInputOrnamentsComponent;
  let fixture: ComponentFixture<CmInputOrnamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmInputOrnamentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmInputOrnamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
