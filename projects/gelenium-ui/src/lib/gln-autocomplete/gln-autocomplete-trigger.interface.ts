import { ElementRef } from '@angular/core';

export interface GlnAutocompleteTrigger {
  // Set focus to the current element.
  setFocus(): void;
  getOriginRef(): ElementRef<HTMLElement>;
  setValueForInput(value: string): void;
}
