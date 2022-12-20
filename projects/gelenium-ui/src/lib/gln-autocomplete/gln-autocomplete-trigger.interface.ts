import { ElementRef } from '@angular/core';

export interface GlnAutocompleteTrigger {
  // Set focus to the current element.
  passFocus(): void;
  // Get the dimensions of the source.
  getOriginalRect(): DOMRect | null;
  // Set the new value of the current element.
  setValue(value: string | null | undefined): void;
}
