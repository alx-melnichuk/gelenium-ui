import { GlnButtonExterior } from './gln-button-exterior.interface';
import { GlnFrameSize } from '../_interfaces/gln-frame-size.interface';

export interface GlnButtonConfig {
  exterior?: GlnButtonExterior;
  frameSize?: GlnFrameSize;
  frameSizeValue?: number;
  labelPd?: number; // px
  isNoRipple?: boolean;
}
