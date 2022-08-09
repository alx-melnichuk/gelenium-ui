import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectConfigComponent } from './select-config.component';

describe('SelectConfigComponent', () => {
  let component: SelectConfigComponent;
  let fixture: ComponentFixture<SelectConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectConfigComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
