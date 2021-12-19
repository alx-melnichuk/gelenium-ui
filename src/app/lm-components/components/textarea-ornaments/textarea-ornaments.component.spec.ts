import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaOrnamentsComponent } from './textarea-ornaments.component';

describe('TextareaOrnamentsComponent', () => {
  let component: TextareaOrnamentsComponent;
  let fixture: ComponentFixture<TextareaOrnamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextareaOrnamentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaOrnamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
