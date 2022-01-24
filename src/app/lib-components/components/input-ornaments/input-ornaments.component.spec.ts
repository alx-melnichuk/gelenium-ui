import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOrnamentsComponent } from './input-ornaments.component';

describe('InputOrnamentsComponent', () => {
  let component: InputOrnamentsComponent;
  let fixture: ComponentFixture<InputOrnamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputOrnamentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputOrnamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
