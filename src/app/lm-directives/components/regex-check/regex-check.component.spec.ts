import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexCheckComponent } from './regex-check.component';

describe('RegexCheckComponent', () => {
  let component: RegexCheckComponent;
  let fixture: ComponentFixture<RegexCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegexCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegexCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
