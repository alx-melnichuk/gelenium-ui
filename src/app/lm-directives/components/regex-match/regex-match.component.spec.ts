import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexMatchComponent } from './regex-match.component';

describe('RegexMatchComponent', () => {
  let component: RegexMatchComponent;
  let fixture: ComponentFixture<RegexMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegexMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegexMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
