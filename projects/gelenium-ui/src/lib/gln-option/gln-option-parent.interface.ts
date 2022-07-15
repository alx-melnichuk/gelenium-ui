import { InjectionToken } from '@angular/core';

/** Describes the interface of a option element. */
export interface GlnOptionItem {
  value: unknown | null;
  selected: boolean | null;
}

/**
 * Describes the interface of a parent element that contains a list of options.
 * Contains properties that can be used by options.
 */
export interface GlnOptionParent {
  checkmark?: boolean | null; // Only for multiple=true
  multiple?: boolean | null;
  noRipple?: boolean | null;
  optionSelection(option: GlnOptionItem): void;
}

/**
 * The injection token that is used to access the parent element from the menu item.
 */
export const GLN_OPTION_PARENT = new InjectionToken<GlnOptionParent>('GLN_OPTION_PARENT');
