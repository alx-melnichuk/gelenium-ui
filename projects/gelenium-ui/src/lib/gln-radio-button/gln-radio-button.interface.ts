import { InjectionToken } from '@angular/core';

export interface GlnRadioButton {
  readonly id: string;
  readonly name: string;
  readonly value: string | null | undefined;
  setIsChecked(newValue: boolean | null): void;
  getIsChecked(): boolean;
  setProperties(properties: Record<string, unknown>): void;
}

/**
 * The injection token that is used to access the "radio button" description element.
 */
export const GLN_RADIO_BUTTON = new InjectionToken<GlnRadioButton>('GLN_RADIO_BUTTON');
