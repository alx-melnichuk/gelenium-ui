import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrRegexCheckBasicComponent } from './dr-regex-check-basic.component';

describe('DrRegexCheckBasicComponent', () => {
  let component: DrRegexCheckBasicComponent;
  let fixture: ComponentFixture<DrRegexCheckBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrRegexCheckBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrRegexCheckBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
