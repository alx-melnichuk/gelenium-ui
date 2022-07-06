import { InjectionToken } from '@angular/core';

/**
 * Describes the interface of a parent element that contains a list of menu items.
 * Contains properties that can be used by menu items.
 */
export interface GlnMenuItemParent {
  noRipple?: boolean | null;
  multiple?: boolean | null;
  noCheckmark?: boolean | null; // Only for multiple=true
}

/**
 * The injection token that is used to access the parent element from the menu item.
 */
export const GLN_MENU_ITEM_PARENT = new InjectionToken<GlnMenuItemParent>('GLN_MENU_ITEM_PARENT');
