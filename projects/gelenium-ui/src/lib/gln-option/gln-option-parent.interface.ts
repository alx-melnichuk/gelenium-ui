import { InjectionToken } from '@angular/core';

/** Describes the interface of a option element. */
export interface GlnOptionItem {
  value: unknown | null;
  selected: boolean | null;
  setSelected(value: boolean | null): void;
}

/**
 * Describes the interface of a parent element that contains a list of options.
 * Contains properties that can be used by options.
 */
export interface GlnOptionParent {
  checkmark?: boolean | null | undefined; // Only for multiple=true
  multiple?: boolean | null | undefined;
  noRipple?: boolean | null | undefined;
  optionSelection(option: GlnOptionItem): void;
}

/**
 * The injection token that is used to access the parent element from the menu item.
 */
export const GLN_OPTION_PARENT = new InjectionToken<GlnOptionParent>('GLN_OPTION_PARENT');
