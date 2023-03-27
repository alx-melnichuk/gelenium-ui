import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmChipOrnamentsComponent } from './cm-chip-ornaments.component';

describe('CmChipOrnamentsComponent', () => {
  let component: CmChipOrnamentsComponent;
  let fixture: ComponentFixture<CmChipOrnamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmChipOrnamentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmChipOrnamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
