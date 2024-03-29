import { InjectionToken } from '@angular/core';

import { GlnOption } from './gln-option.interface';

/**
 * Describes the interface of a parent element that contains a list of options.
 * Contains properties that can be used by options.
 */
export interface GlnOptionParent {
  checkmark?: boolean | null | undefined; // Only for multiple=true
  multiple?: boolean | null | undefined;
  noRipple?: boolean | null | undefined;
  // Set the option as selected.
  setOptionSelected(option: GlnOption | null): void;
}

/**
 * The injection token that is used to access the parent element for the option.
 */
export const GLN_OPTION_PARENT = new InjectionToken<GlnOptionParent>('GLN_OPTION_PARENT');
