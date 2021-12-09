import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexMatchApiComponent } from './regex-match-api.component';

describe('RegexMatchApiComponent', () => {
  let component: RegexMatchApiComponent;
  let fixture: ComponentFixture<RegexMatchApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegexMatchApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegexMatchApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
