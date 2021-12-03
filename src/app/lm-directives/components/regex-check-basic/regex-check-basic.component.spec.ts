import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexCheckBasicComponent } from './regex-check-basic.component';

describe('RegexCheckBasicComponent', () => {
  let component: RegexCheckBasicComponent;
  let fixture: ComponentFixture<RegexCheckBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegexCheckBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegexCheckBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
