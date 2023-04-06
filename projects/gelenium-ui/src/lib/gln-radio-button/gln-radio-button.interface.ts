import { InjectionToken } from '@angular/core';

export interface GlnRadioButton {
  readonly id: string;
  readonly name: string;
  readonly value: string | null | undefined;
  setChecked(newValue: boolean): void;
  setProperties(properties: Record<string, unknown>): void;
}

/**
 * The injection token that is used to access the "radio button" description element.
 */
export const GLN_RADIO_BUTTON = new InjectionToken<GlnRadioButton>('GLN_RADIO_BUTTON');
