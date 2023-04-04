import { InjectionToken } from '@angular/core';

import { GlnRadioButton } from '../gln-radio-button/gln-radio-button.interface';

export interface GlnRadioGroup {
  disabled?: boolean | null | undefined;
  noHover?: boolean | null | undefined;
  noRipple?: boolean | null | undefined;
  readOnly: boolean | null | undefined;
  selectedRadio: GlnRadioButton | null;
  // Set the radio button as selected.
  setRadioSelected(radioButton: GlnRadioButton | null): void;
}

/**
 * The injection token that is used to access the radio button group description element.
 */
export const GLN_RADIO_GROUP = new InjectionToken<GlnRadioGroup>('GLN_RADIO_GROUP');
