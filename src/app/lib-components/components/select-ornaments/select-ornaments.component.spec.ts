import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOrnamentsComponent } from './select-ornaments.component';

describe('SelectOrnamentsComponent', () => {
  let component: SelectOrnamentsComponent;
  let fixture: ComponentFixture<SelectOrnamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectOrnamentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOrnamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
