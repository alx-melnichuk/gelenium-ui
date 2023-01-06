import { GlnOption } from '../gln-option/gln-option.interface';

import { GlnAutocompleteTrigger } from './gln-autocomplete-trigger.interface';

export interface GlnAutocomplete {
  readonly clearOnEscape: boolean | null;
  readonly disabled: boolean | null;
  readonly id: string;
  readonly isContainerMousedown: boolean | null;
  readonly noOpenOnMouse?: boolean | null;
  readonly openOnFocus?: boolean | null;
  // A sign that the panel is open.
  isOpen(): boolean;
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
  // Set trigger object for autocomplete.
  setTrigger(trigger: GlnAutocompleteTrigger | null): void;
}
