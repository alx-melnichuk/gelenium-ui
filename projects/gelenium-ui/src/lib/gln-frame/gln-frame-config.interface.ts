import { GlnFrameOrnamAlign } from '../directives/gln-frame-ornament/gln-frame-ornam-align.interface';

import { GlnFrameExterior } from './gln-frame-exterior.interface';
import { GlnFrameSize } from './gln-frame-size.interface';

export interface GlnFrameConfig {
  exterior?: GlnFrameExterior | undefined;
  frameSize?: GlnFrameSize | undefined;
  frameSizeValue?: number | undefined;
  hoverColor?: boolean | undefined;
  isLabelShrink?: boolean | undefined;
  labelPd?: number | undefined; // px
  isNoAnimation?: boolean | undefined;
  isNoLabel?: boolean | undefined;
  ornamLfAlign?: GlnFrameOrnamAlign | undefined;
  ornamRgAlign?: GlnFrameOrnamAlign | undefined;
}
