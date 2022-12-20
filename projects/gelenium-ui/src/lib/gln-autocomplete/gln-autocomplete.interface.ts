import { GlnOption } from '../gln-option/gln-option.interface';

import { GlnAutocompleteTrigger } from './gln-autocomplete-trigger.interface';

export interface GlnAutocomplete {
  readonly disabled: boolean | null;
  id: string;
  // A sign that the panel is open.
  isPanelOpen(): boolean;
  //
  setTrigger(trigger: GlnAutocompleteTrigger): void;
  // Open the autocomplete suggestion panel.
  open(): void;
  // Close the autocomplete suggestion panel.
  close(options?: { noAnimation?: boolean }): void;
  // Get the option marked.
  getMarkedOption(): GlnOption | null;
  // Move the marked option by the key.
  moveMarkedOptionByKey(keyboardKey: string): void;
  // Set the marked option as selected.
  setMarkedOptionAsSelected(): void;
}
