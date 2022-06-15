import { GlnFrameSize } from '../gln-frame/gln-frame-size.interface';
// import { GlnFrameOrnamAlign } from '../directives/gln-frame-ornament/gln-frame-ornam-align.interface';
import { GlnFrameExterior } from '../gln-frame/gln-frame-exterior.interface';

// Remove to GlnFrameConfig
export interface GrnSelectConfig {
  exterior?: GlnFrameExterior;
  frameSize?: GlnFrameSize;
  frameSizeValue?: number;
  isLabelShrink?: boolean;
  hiddenLabel?: boolean;
  labelPd?: number; // px
  // ornamLfAlign?: GlnFrameOrnamAlign;
  // ornamRgAlign?: GlnFrameOrnamAlign;
}
