import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexRemoveComponent } from './regex-remove.component';

describe('RegexRemoveComponent', () => {
  let component: RegexRemoveComponent;
  let fixture: ComponentFixture<RegexRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegexRemoveComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegexRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
