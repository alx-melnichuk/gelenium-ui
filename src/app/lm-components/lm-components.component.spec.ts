import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmComponentsComponent } from './lm-components.component';

describe('LmComponentsComponent', () => {
  let component: LmComponentsComponent;
  let fixture: ComponentFixture<LmComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LmComponentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LmComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
