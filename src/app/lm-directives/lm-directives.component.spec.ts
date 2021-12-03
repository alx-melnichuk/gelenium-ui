import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmDirectivesComponent } from './lm-directives.component';

describe('LmDirectivesComponent', () => {
  let component: LmDirectivesComponent;
  let fixture: ComponentFixture<LmDirectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LmDirectivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LmDirectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
