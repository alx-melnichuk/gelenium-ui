import { GlnBaseControlConfig } from '../_interface/gln-base-control-config.interface';

export interface GlnSwitchConfig extends GlnBaseControlConfig {
  isChecked?: boolean | undefined;
  isNoRipple?: boolean | undefined;
}
