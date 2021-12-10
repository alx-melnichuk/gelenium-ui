import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexRemoveApiComponent } from './regex-remove-api.component';

describe('RegexRemoveApiComponent', () => {
  let component: RegexRemoveApiComponent;
  let fixture: ComponentFixture<RegexRemoveApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegexRemoveApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegexRemoveApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
