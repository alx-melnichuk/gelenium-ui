import { GlnButtonExterior } from './gln-button-exterior.interface';
import { GlnFrameSize } from '../gln-frame/gln-frame-size.interface';
import { GlnFrameOrnamAlign } from '../directives/gln-frame-ornament/gln-frame-ornam-align.interface';

export interface GlnButtonConfig {
  exterior?: GlnButtonExterior;
  frameSize?: GlnFrameSize;
  frameSizeValue?: number;
  isNoRipple?: boolean;
  labelPd?: number; // px
  ornamLfAlign?: GlnFrameOrnamAlign;
  ornamRgAlign?: GlnFrameOrnamAlign;
}
