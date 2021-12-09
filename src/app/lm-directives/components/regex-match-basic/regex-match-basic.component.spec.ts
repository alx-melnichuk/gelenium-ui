import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexMatchBasicComponent } from './regex-match-basic.component';

describe('RegexMatchBasicComponent', () => {
  let component: RegexMatchBasicComponent;
  let fixture: ComponentFixture<RegexMatchBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegexMatchBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegexMatchBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
