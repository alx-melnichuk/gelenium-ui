import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdStartComponent } from './gd-start.component';

describe('GdStartComponent', () => {
  let component: GdStartComponent;
  let fixture: ComponentFixture<GdStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GdStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GdStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
