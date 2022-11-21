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

// Horizontal position
export type GlnOptionListPositionType = 'start' | 'center' | 'end';

/** Horizontal position = 'start' | 'center' | 'end'; */
export enum GlnOptionListPosition {
  start = 'start',
  center = 'center',
  end = 'end',
}

export class GlnOptionListPositionUtil {
  public static create(value: GlnOptionListPosition | string | null): GlnOptionListPosition {
    return GlnOptionListPositionUtil.convert((value || '').toString()) || GlnOptionListPosition.start;
  }
  public static convert(value: string | null): GlnOptionListPosition | null {
    let result: GlnOptionListPosition | null = null;
    switch (value) {
      case GlnOptionListPosition.start.valueOf():
        result = GlnOptionListPosition.start;
        break;
      case GlnOptionListPosition.center.valueOf():
        result = GlnOptionListPosition.center;
        break;
      case GlnOptionListPosition.end.valueOf():
        result = GlnOptionListPosition.end;
        break;
    }
    return result;
  }
}
