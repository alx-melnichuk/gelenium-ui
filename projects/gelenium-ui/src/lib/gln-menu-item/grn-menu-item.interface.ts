import { GlnMenuItemComponent } from './gln-menu-item.component';

export interface GlnMenuItemComponentMapItem {
  index: number;
  menuItem: GlnMenuItemComponent;
}

export interface GlnMenuItemComponentMap {
  [key: string]: GlnMenuItemComponentMapItem;
}
