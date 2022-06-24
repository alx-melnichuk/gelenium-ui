import { GlnFrameSize } from './gln-frame-size.interface';
import { GlnFrameOrnamAlign } from '../directives/gln-frame-ornament/gln-frame-ornam-align.interface';
import { GlnFrameExterior } from './gln-frame-exterior.interface';

export interface GlnFrameConfig {
  exterior?: GlnFrameExterior;
  frameSize?: GlnFrameSize;
  frameSizeValue?: number;
  hoverColor?: boolean;
  isLabelShrink?: boolean;
  labelPd?: number; // px
  noLabel?: boolean;
  ornamLfAlign?: GlnFrameOrnamAlign;
  ornamRgAlign?: GlnFrameOrnamAlign;
}
