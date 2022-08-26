import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdDescriptionAboutLibraryComponent } from './gd-description-about-library.component';

describe('GdDescriptionAboutLibraryComponent', () => {
  let component: GdDescriptionAboutLibraryComponent;
  let fixture: ComponentFixture<GdDescriptionAboutLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GdDescriptionAboutLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GdDescriptionAboutLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
