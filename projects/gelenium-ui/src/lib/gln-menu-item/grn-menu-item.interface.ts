import { GlnMenuItemComponent } from './gln-menu-item.component';

export interface GlnMenuItem {
  label: string | null;
  value: unknown | null;
}

export interface GlnMenuItemComponentMapItem {
  index: number;
  menuItem: GlnMenuItemComponent;
}

export interface GlnMenuItemComponentMap {
  [key: string]: GlnMenuItemComponentMapItem;
}
