import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnMenuItemComponent } from './gln-menu-item.component';

describe('GlnMenuItemComponent', () => {
  let component: GlnMenuItemComponent;
  let fixture: ComponentFixture<GlnMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnMenuItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
