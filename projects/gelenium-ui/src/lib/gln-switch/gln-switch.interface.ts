import { GlnSwitchPosition } from './gln-switch-position.interface';

export interface GlnSwitchConfig {
  isChecked?: boolean | undefined;
  isNoAnimation?: boolean | undefined;
  isNoRipple?: boolean | undefined;
  isReadOnly?: boolean | undefined;
  isRequired?: boolean | undefined;
  position?: GlnSwitchPosition | undefined; // 'top' | 'bottom' | 'start' | 'end';
}
