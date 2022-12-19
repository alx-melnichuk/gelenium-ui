import { GlnOption } from './gln-option.interface';

export interface GlnOptionsTrigger {
  // Set focus to the current element.
  passFocus(): void;
  // Get the dimensions of the source.
  getOriginalRect(): DOMRect | null;
  // Set the new value of the current element.
  setValue(value: string | null | undefined): void;
}

export interface GlnOptions {
  readonly disabled: boolean | null;
  // A sign that the panel is open.
  isPanelOpen(): boolean;
  // Open the autocomplete suggestion panel.
  open(trigger: GlnOptionsTrigger): void;
  // Close the autocomplete suggestion panel.
  close(options?: { noAnimation?: boolean }): void;
  // Get the option marked.
  getMarkedOption(): GlnOption | null;
  // Move the marked option by the key.
  moveMarkedOptionByKey(keyboardKey: string): void;
  // Set the marked option as selected.
  setMarkedOptionAsSelected(): void;
}
