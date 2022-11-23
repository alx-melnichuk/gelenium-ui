import { GlnAutocomplete1Trigger } from './gln-autocomplete1-trigger.interface';

export interface GlnAutocomplete1Options {
  // A sign that the panel is open.
  isPanelOpen(): boolean;
  // Open the autocomplete suggestion panel.
  openPanel(autocompleteTrigger: GlnAutocomplete1Trigger): void;
  // Close the autocomplete suggestion panel.
  closePanel(): void;
  // Move the option marker by the amount of the offset.
  movingMarkedOption(delta: number): void;
}
