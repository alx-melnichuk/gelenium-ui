import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdDescriptionComponent } from './gd-description.component';

describe('GdDescriptionComponent', () => {
  let component: GdDescriptionComponent;
  let fixture: ComponentFixture<GdDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GdDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GdDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
