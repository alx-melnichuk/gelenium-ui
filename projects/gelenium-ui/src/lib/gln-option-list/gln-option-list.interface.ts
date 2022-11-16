import { ElementRef } from '@angular/core';

import { GlnOptionListTrigger } from './gln-option-list-trigger.interface';

export const KeyboardKeysToMoveMarkedToArrow = ['ArrowUp', 'ArrowDown', 'Home', 'End'];
export const KeyboardKeysToMoveMarkedToPage = ['PageUp', 'PageDown'];

export const KeyboardKeysToMoveMarkedOption = [...KeyboardKeysToMoveMarkedToArrow, ...KeyboardKeysToMoveMarkedToPage];

export interface GlnOptionList {
  // A sign that the panel is open.
  isPanelOpen(): boolean;
  // Open the autocomplete suggestion panel.
  openPanel(trigger: GlnOptionListTrigger): void;
  // Close the autocomplete suggestion panel.
  closePanel(): void;
  // Move the option marker by the amount of the offset.
  moveMarkedOption(keyboardKey: string): void;
}

export interface Focusable {
  focus(): void;
}

export interface HostableRef {
  hostRef: ElementRef<HTMLElement>;
}

export interface Frameable {
  frameComp: HostableRef;
}
