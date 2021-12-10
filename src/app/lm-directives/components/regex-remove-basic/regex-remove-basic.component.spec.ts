import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexRemoveBasicComponent } from './regex-remove-basic.component';

describe('RegexRemoveBasicComponent', () => {
  let component: RegexRemoveBasicComponent;
  let fixture: ComponentFixture<RegexRemoveBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegexRemoveBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegexRemoveBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
