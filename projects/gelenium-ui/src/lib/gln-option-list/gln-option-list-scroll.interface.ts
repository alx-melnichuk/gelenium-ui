import { GlnOption } from './../gln-option/gln-option.interface';
export interface GlnOptionListScroll {
  // Get the option marked.
  getMarkedOption(): GlnOption | null;
  // Move the marked option by the key.
  moveMarkedOptionByKey(keyboardKey: string): void;
}
