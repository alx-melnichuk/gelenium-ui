import { ElementRef, InjectionToken } from '@angular/core';

export interface GlnRadioButton {
  readonly hostRef: ElementRef<HTMLElement>;
  readonly id: string;
  readonly name: string;
  readonly value: string | null | undefined;

  getChecked(): boolean;
  setChecked(): void;
  setUnchecked(newChecked: boolean | null): void;
  focus(): void;
  setProperties(properties: Record<string, unknown>): void;
}

/**
 * The injection token that is used to access the "radio button" description element.
 */
export const GLN_RADIO_BUTTON = new InjectionToken<GlnRadioButton>('GLN_RADIO_BUTTON');
