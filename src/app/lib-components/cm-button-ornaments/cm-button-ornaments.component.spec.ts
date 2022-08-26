import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmButtonOrnamentsComponent } from './cm-button-ornaments.component';

describe('CmButtonOrnamentsComponent', () => {
  let component: CmButtonOrnamentsComponent;
  let fixture: ComponentFixture<CmButtonOrnamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmButtonOrnamentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmButtonOrnamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
