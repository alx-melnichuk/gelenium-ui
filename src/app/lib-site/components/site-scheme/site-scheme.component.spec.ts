import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSchemeComponent } from './site-scheme.component';

describe('SiteSchemeComponent', () => {
  let component: SiteSchemeComponent;
  let fixture: ComponentFixture<SiteSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
