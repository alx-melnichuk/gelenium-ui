import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmGuidesComponent } from './lm-guides.component';

describe('LmGuidesComponent', () => {
  let component: LmGuidesComponent;
  let fixture: ComponentFixture<LmGuidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LmGuidesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LmGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
