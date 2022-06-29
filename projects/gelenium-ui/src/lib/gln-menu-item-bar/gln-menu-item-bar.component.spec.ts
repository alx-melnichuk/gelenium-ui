import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnMenuItemBarComponent } from './gln-menu-item-bar.component';

describe('GlnMenuItemBarComponent', () => {
  let component: GlnMenuItemBarComponent;
  let fixture: ComponentFixture<GlnMenuItemBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnMenuItemBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnMenuItemBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
