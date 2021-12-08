import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexCheckApiComponent } from './regex-check-api.component';

describe('RegexCheckApiComponent', () => {
  let component: RegexCheckApiComponent;
  let fixture: ComponentFixture<RegexCheckApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegexCheckApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegexCheckApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
