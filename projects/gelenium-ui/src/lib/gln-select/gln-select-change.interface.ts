import { GlnOption } from '../gln-option/gln-option.interface';
import { GlnSelectionChange } from './gln-selection-change.interface';

export interface GlnSelectChange {
  value: unknown | null;
  values: unknown[];
  change: GlnSelectionChange<GlnOption>;
}
