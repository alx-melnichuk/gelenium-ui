import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdStartGettingStartedComponent } from './gd-start-getting-started.component';

describe('GdStartGettingStartedComponent', () => {
  let component: GdStartGettingStartedComponent;
  let fixture: ComponentFixture<GdStartGettingStartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GdStartGettingStartedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GdStartGettingStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
