import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnMenuItemPanelShowComponent } from './gln-menu-item-panel-show.component';

describe('GlnMenuItemPanelShowComponent', () => {
  let component: GlnMenuItemPanelShowComponent;
  let fixture: ComponentFixture<GlnMenuItemPanelShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnMenuItemPanelShowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnMenuItemPanelShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
