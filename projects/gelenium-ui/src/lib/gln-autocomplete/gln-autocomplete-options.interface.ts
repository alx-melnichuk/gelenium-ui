import { ElementRef } from '@angular/core';

export interface GlnAutocompleteOptions {
  // Open the autocomplete suggestion panel.
  openPanel(originRef: ElementRef<HTMLElement>): void;
  // Close the autocomplete suggestion panel.
  closePanel(): void;
}
