import { GlnAutocompleteTrigger } from './gln-autocomplete-trigger.interface';

export interface GlnAutocompleteOptions {
  // A sign that the panel is open.
  isPanelOpen(): boolean;
  // Open the autocomplete suggestion panel.
  openPanel(autocompleteTrigger: GlnAutocompleteTrigger): void;
  // Close the autocomplete suggestion panel.
  closePanel(): void;
  // Move the option marker by the amount of the offset.
  movingMarkedOption(delta: number): void;
}
