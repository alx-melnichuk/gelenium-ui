import { ElementRef } from '@angular/core';
import { GlnOption } from './gln-option.interface';

export const OptionsScrollKeysToArrow = ['ArrowUp', 'ArrowDown', 'Home', 'End'];
export const OptionsScrollKeysToPage = ['PageUp', 'PageDown'];

export const OptionsScrollKeys = [...OptionsScrollKeysToArrow, ...OptionsScrollKeysToPage];

export interface GlnOptionsScroll {
  readonly hostRef: ElementRef<HTMLElement>;
  // Get the option marked.
  getMarkedOption(): GlnOption | null;
  // Move the marked option by the key.
  moveMarkedOptionByKey(keyboardKey: string): void;
}
