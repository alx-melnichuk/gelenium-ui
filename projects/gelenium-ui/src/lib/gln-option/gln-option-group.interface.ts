import { InjectionToken } from '@angular/core';

export interface GlnOptionGroup {
  disabled?: boolean | null | undefined;
}

/**
 * The injection token that is used to access the option group description element.
 */
export const GLN_OPTION_GROUP = new InjectionToken<GlnOptionGroup>('GLN_OPTION_GROUP');
