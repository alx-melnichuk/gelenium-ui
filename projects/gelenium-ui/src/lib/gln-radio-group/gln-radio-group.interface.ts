import { InjectionToken } from '@angular/core';

import { GlnRadioButton } from '../gln-radio-button/gln-radio-button.interface';

export interface GlnRadioGroup {
  disabled?: boolean | null | undefined;
  noAnimation?: boolean | null | undefined;
  noHover?: boolean | null | undefined;
  noRipple?: boolean | null | undefined;
  readOnly: boolean | null | undefined;
  position?: string | null | undefined; // 'top' | 'bottom' | 'start' | 'end';
  selectedRadio: GlnRadioButton | null;
  size?: number | string | null | undefined; // 'little','short','small','middle','wide','large','huge'

  readonly name: string;

  getRadioList(): GlnRadioButton[];
  // Set the radio button as selected.
  setSelectedRadio(radioButton: GlnRadioButton | null): void;
}

/**
 * The injection token that is used to access the radio button group description element.
 */
export const GLN_RADIO_GROUP = new InjectionToken<GlnRadioGroup>('GLN_RADIO_GROUP');
