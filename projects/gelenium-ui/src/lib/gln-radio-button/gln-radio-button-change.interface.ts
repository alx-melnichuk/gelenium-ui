import { GlnRadioButton } from './gln-radio-button.interface';

export interface GlnRadioButtonChange {
  value: string | null | undefined;
  source: GlnRadioButton | null;
}
