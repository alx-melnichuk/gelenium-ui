import { GlnInputExterior } from './gln-input-exterior.interface';
import { GlnFrameSize } from './gln-frame-size.interface';
import { GlnOrnamAlign } from './gln-ornam-align.interface';

export interface GlnFrameConfig {
  exterior?: GlnInputExterior;
  frameSize?: GlnFrameSize;
  frameSizeValue?: number;
  isLabelShrink?: boolean;
  hiddenLabel?: boolean;
  labelPd?: number; // px
  ornamLfAlign?: GlnOrnamAlign;
  ornamRgAlign?: GlnOrnamAlign;
}
