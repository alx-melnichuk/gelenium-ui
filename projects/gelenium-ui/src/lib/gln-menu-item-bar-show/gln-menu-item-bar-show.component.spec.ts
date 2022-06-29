import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnMenuItemBarShowComponent } from './gln-menu-item-bar-show.component';

describe('GlnMenuItemBarShowComponent', () => {
  let component: GlnMenuItemBarShowComponent;
  let fixture: ComponentFixture<GlnMenuItemBarShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnMenuItemBarShowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnMenuItemBarShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
