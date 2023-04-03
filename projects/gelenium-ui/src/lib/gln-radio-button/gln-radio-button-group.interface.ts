import { InjectionToken } from '@angular/core';

import { GlnRadioButton } from './gln-radio-button.interface';

export interface GlnRadioButtonGroup {
  disabled?: boolean | null | undefined;
  noRipple?: boolean | null | undefined;
  readOnly: boolean | null | undefined;
  // Set the radio button as selected.
  setRadioSelected(radioButton: GlnRadioButton | null): void;
}

/**
 * The injection token that is used to access the radio button group description element.
 */
export const GLN_RADIOBUTTON_GROUP = new InjectionToken<GlnRadioButtonGroup>('GLN_RADIOBUTTON_GROUP');
