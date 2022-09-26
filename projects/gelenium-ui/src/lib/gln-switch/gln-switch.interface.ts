import { GlnBaseControlConfig } from '../_interface/gln-base-control-config.interface';

export interface GlnSwitchConfig extends GlnBaseControlConfig {
  isChecked?: boolean | undefined;
  isNoAnimation?: boolean | undefined;
  isNoRipple?: boolean | undefined;
  isReadOnly?: boolean | undefined;
  isRequired?: boolean | undefined;
}
