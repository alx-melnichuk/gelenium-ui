import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnMenuItemPanelComponent } from './gln-menu-item-panel.component';

describe('GlnMenuItemPanelComponent', () => {
  let component: GlnMenuItemPanelComponent;
  let fixture: ComponentFixture<GlnMenuItemPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnMenuItemPanelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnMenuItemPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
