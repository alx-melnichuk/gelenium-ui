import { GlnFrameOrnamAlign } from '../directives/gln-frame-ornament/gln-frame-ornam-align.interface';

import { GlnFrameExterior } from './gln-frame-exterior.interface';
import { GlnFrameSize } from './gln-frame-size.interface';

export interface GlnFrameConfig {
  exterior?: string | undefined; // GlnFrameExteriorType
  frameSize?: string | undefined; // GlnFrameSizeType
  isLabelShrink?: boolean | undefined;
  isNoAnimation?: boolean | undefined;
  isNoLabel?: boolean | undefined;
  isRequired?: boolean | undefined;
}

// deprecate
export interface GlnFrameConfigOld {
  exterior?: GlnFrameExterior | undefined;
  frameSize?: GlnFrameSize | undefined;
  frameSizeValue?: number | undefined;
  isLabelShrink?: boolean | undefined;
  isNoAnimation?: boolean | undefined;
  isNoLabel?: boolean | undefined;
  labelPd?: number | undefined; // px
  ornamLfAlign?: GlnFrameOrnamAlign | undefined;
  ornamRgAlign?: GlnFrameOrnamAlign | undefined;
}
